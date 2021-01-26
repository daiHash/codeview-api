import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello() {
    return {
      port: parseInt(process.env.DATABASE_PORT, 10),
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      cbURL: process.env.GOOGLE_CALLBACK_URL,
      env: process.env.NODE_ENV
    }
  }
}
