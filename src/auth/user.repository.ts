import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { UserData } from './user.interface'
import { Request } from 'express'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signIn(req: Request): Promise<User | UserData> {
    const { username, avatarUrl, googleID } = req.user as UserData
    const isUser = await this.findOne({ googleID })

    if (!isUser) {
      const newUser = new User()
      newUser.googleID = googleID
      newUser.username = username
      newUser.avatarUrl = avatarUrl
      try {
        await newUser.save()
        return newUser
      } catch (error) {
        if (error.code === '23505') {
          // Duplicate user key
          throw new ConflictException('User already exists')
        } else {
          console.error({ error })
          throw new InternalServerErrorException()
        }
      }
    }

    return req.user as UserData
  }
}
