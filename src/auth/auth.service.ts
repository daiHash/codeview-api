import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserData } from './user.interface'
import { User } from './user.entity'
import { Repository } from 'typeorm'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async validateUser(user: UserData) {
    const { googleID } = user
    const isUser = await this.findUser(googleID)

    if (!isUser) {
      try {
        this.createUser(user)
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
    return user
  }

  createUser(user: UserData) {
    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser)
  }

  async findUser(googleID: string) {
    return this.userRepository.findOne({ googleID })
  }
}
