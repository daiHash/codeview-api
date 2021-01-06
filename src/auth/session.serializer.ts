import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'

export type Done = (err: Error, user: User) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super()
  }

  serializeUser(user: User, done: Done): void {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done): Promise<void> {
    const userDB = await this.userRepository.findOne({
      googleID: user.googleID
    })
    return userDB ? done(null, userDB) : done(null, null)
  }
}
