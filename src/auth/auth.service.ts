import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserData } from './user.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  signIn(user: UserData) {
    return this.userRepository.signIn(user)
    // TODO: Handle after signIn
  }
}
