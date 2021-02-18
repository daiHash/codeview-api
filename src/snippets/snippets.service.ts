import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../auth/user.entity'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'
import { Snippet } from './snippet.entity'
import { SnippetRepository } from './snippet.repository'
import { SnippetByID } from './snippets.interface'

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(SnippetRepository)
    private snippetRepository: SnippetRepository
  ) {}

  async getAllGuestSnippets(
    filterDto: GetSnippetsFilterDto
  ): Promise<Snippet[]> {
    return this.snippetRepository.getLatestGuestSnippets(filterDto)
  }

  async getSnippets(
    filterDto: GetSnippetsFilterDto,
    user: User
  ): Promise<Snippet[]> {
    return this.snippetRepository.getSnippets(filterDto, user)
  }

  async getSnippetById(id: number, user: User): Promise<SnippetByID> {
    const snippetQueryData = { id }

    const snippet = await this.snippetRepository.findOne({
      where: snippetQueryData
    })

    if (!snippet) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`)
    }

    const snippetByID = {
      ...snippet,
      isUser: user ? snippet.userId === user.id : null
    } as SnippetByID

    return snippetByID
  }

  async createSnippet(
    createSnippetDto: CreateSnippetDto,
    user: User
  ): Promise<Snippet> {
    return this.snippetRepository.createSnippet(createSnippetDto, user)
  }

  async updateSnippet(
    id: number,
    user: User,
    createSnippetDto: Partial<CreateSnippetDto>
  ): Promise<Snippet> {
    const snippet = await this.getSnippetById(id, user)
    const { title, description, snippetContentMD, tags } = createSnippetDto

    if (title) snippet.title = title
    if (description) snippet.description = description
    if (snippetContentMD) snippet.snippetContentMD = [...snippetContentMD]
    if (tags) snippet.tags = [...tags]

    const updatedSnippet = this.snippetRepository.create(snippet)
    const newSnippet = await this.snippetRepository.save(updatedSnippet)
    return newSnippet
  }

  async updateSnippetFavorite(
    id: number,
    user: User,
    { isFavorite }: { isFavorite: boolean }
  ) {
    const snippet = await this.getSnippetById(id, user)
    snippet.isFavorite = isFavorite
    const updatedSnippet = this.snippetRepository.create(snippet)
    const newSnippet = await this.snippetRepository.save(updatedSnippet)
    return newSnippet
  }

  async deleteSnippet(id: number, user: User): Promise<void> {
    const result = await this.snippetRepository.delete({ id, userId: user.id })

    if (result.affected === 0) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`)
    }
  }
}
