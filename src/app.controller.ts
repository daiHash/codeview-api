import { Controller, Get } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './auth/user.entity'

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  @Get()
  getHello() {
    return {
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      cbURL: process.env.GOOGLE_CALLBACK_URL,
      env: process.env.NODE_ENV,
      baseUrl: process.env.CLIENT_BASE_URL
    }
  }
}
