import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { UserData } from './user.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signIn(user: UserData): Promise<void> {
    const { username, avatarUrl, googleID } = user
    const isUser = await this.findOne({ googleID: user.googleID })

    if (!isUser) {
      const newUser = new User()
      newUser.googleID = googleID
      newUser.username = username
      newUser.avatarUrl = avatarUrl
      try {
        await newUser.save()
        return
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
  }
}
