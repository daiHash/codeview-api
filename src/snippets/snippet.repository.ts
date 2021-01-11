import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Snippet } from './snippet.entity'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { User } from 'src/auth/user.entity'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'

@EntityRepository(Snippet)
export class SnippetRepository extends Repository<Snippet> {
  async getSnippets(
    filterDto: GetSnippetsFilterDto,
    user: User
  ): Promise<Snippet[]> {
    const { tags, search } = filterDto
    const query = this.createQueryBuilder('snippet')

    query.where('snippet.userId = :userId', { userId: user.id })

    // TODO: Handle to search by multiple tags
    if (tags) {
      query.andWhere('snippet.tags = :tags', { tags })
    }

    if (search) {
      query.andWhere(
        '(snippet.title LIKE :search OR snippet.description LIKE :search)',
        { search: `%${search}%` }
      )
    }

    try {
      const tasks = await query.getMany()
      return tasks
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async createSnippet(
    createSnippetDto: CreateSnippetDto,
    user: User
  ): Promise<Snippet> {
    const { title, description, snippetContentMD } = createSnippetDto

    const newSnippet = new Snippet()
    newSnippet.title = title
    newSnippet.description = description
    newSnippet.snippetContentMD = [...snippetContentMD]
    newSnippet.user = user

    try {
      await newSnippet.save()
      delete newSnippet.user
      return newSnippet
    } catch (error) {
      console.error({ error })
      throw new InternalServerErrorException()
    }
  }
}
