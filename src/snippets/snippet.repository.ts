import { InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Snippet } from './snippet.entity'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { User } from '../auth/user.entity'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'

@EntityRepository(Snippet)
export class SnippetRepository extends Repository<Snippet> {
  async getLatestGuestSnippets({
    search,
    tags,
    size = 10
  }: GetSnippetsFilterDto): Promise<Snippet[]> {
    const query = this.createQueryBuilder('snippet')

    if (tags) {
      // This query filter if any element of array matches array in db
      query.andWhere('snippet.tags @> :tags', {
        tags: tags.split(',')
      })
    }

    if (search) {
      query.andWhere(
        '(snippet.title LIKE :search OR snippet.description LIKE :search)',
        { search: `%${search}%` }
      )
    }

    try {
      const snippets = await query.addOrderBy('id', 'DESC').take(size).getMany()
      return snippets
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async getSnippets(
    filterDto: GetSnippetsFilterDto,
    user: User
  ): Promise<Snippet[]> {
    const { tags, search } = filterDto
    const query = this.createQueryBuilder('snippet')

    query.where('snippet.userId = :userId', { userId: user.id })

    if (tags) {
      // This query filter if any element of array matches array in db
      query.andWhere('snippet.tags @> :tags', {
        tags: tags.split(',')
      })
    }

    if (search) {
      query.andWhere(
        '(snippet.title LIKE :search OR snippet.description LIKE :search)',
        { search: `%${search}%` }
      )
    }

    try {
      const snippets = await query.getMany()

      if (!snippets) {
        return []
      }
      return snippets
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async getFavoriteSnippets(user: User): Promise<Snippet[]> {
    const query = this.createQueryBuilder('snippet')

    query.andWhere(
      `snippet.id IN (SELECT t.id FROM "snippet" t, jsonb_array_elements(t.favorites) p where (p->>'userId')::int = :userId)`,
      {
        userId: user.id
      }
    )

    try {
      const snippets = await query.getMany()

      if (!snippets) {
        return []
      }
      return snippets
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException()
    }
  }

  async createSnippet(
    createSnippetDto: CreateSnippetDto,
    user: User
  ): Promise<Snippet> {
    const { title, description, snippetContentMD, tags } = createSnippetDto

    const newSnippet = new Snippet()
    newSnippet.title = title
    newSnippet.description = description
    newSnippet.snippetContentMD = [...snippetContentMD]
    newSnippet.tags = [...tags]
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
