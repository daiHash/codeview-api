import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
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

  async createSnippet(
    createSnippetDto: CreateSnippetDto,
    user: User
  ): Promise<Snippet> {
    return this.snippetRepository.createSnippet(createSnippetDto, user)
  }
}
