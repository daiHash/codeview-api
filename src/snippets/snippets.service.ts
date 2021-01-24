import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../auth/user.entity'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'
import { Snippet } from './snippet.entity'
import { SnippetRepository } from './snippet.repository'

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(SnippetRepository)
    private snippetRepository: SnippetRepository
  ) {}

  async getSnippets(
    filterDto: GetSnippetsFilterDto,
    user: User
  ): Promise<Snippet[]> {
    return this.snippetRepository.getSnippets(filterDto, user)
  }

  async getSnippetById(id: number, user: User): Promise<Snippet> {
    const snippet = await this.snippetRepository.findOne({
      where: { id, userId: user.id }
    })

    if (!snippet) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`)
    }

    return snippet
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
    const { title, description, snippetContentMD } = createSnippetDto
    if (title) snippet.title = title
    if (description) snippet.description = description
    if (snippetContentMD) snippet.snippetContentMD = [...snippetContentMD]

    await snippet.save()
    return snippet
  }

  async deleteSnippet(id: number, user: User): Promise<void> {
    const result = await this.snippetRepository.delete({ id, userId: user.id })

    if (result.affected === 0) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`)
    }
  }
}
