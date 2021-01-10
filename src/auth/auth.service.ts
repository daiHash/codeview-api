import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { Request, Response } from 'express'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {}

  signIn(req: Request, res: Response) {
    return this.userRepository.signIn(req, res)
  }
}
