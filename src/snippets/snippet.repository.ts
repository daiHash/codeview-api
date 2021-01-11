import { InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Snippet } from './snippet.entity'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { User } from 'src/auth/user.entity'

@EntityRepository(Snippet)
export class SnippetRepository extends Repository<Snippet> {
  async createSnippet(
    createSnippetDto: CreateSnippetDto,
    user: User
  ): Promise<Snippet> {
    const { title, description, snippetContentMD } = createSnippetDto

    const newSnippet = new Snippet()
    newSnippet.title = title
    newSnippet.description = description
    newSnippet.snippetContentMD = snippetContentMD
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
