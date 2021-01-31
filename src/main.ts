import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as helmet from 'helmet'
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm'
import { getRepository } from 'typeorm'
import { TypeORMSession } from './auth/session/session.entity'
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
// import flash = require('connect-flash')

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const sessionRepo = getRepository(TypeORMSession)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')

  app.use(helmet())

  app.enableCors({
    origin: [configService.get('CLIENT_BASE_URL')],
    credentials: true
  })

  app.set('trust proxy', 1) // trust first proxy

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 2592000 // 30 days,
        // domain: 'http://localhost:8080',
        // secure: true
        // sameSite: 'none'
      },
      store: new TypeormStore().connect(sessionRepo)
    })
  )

  app.use(cookieParser())

  app.use(passport.initialize())
  app.use(passport.session())
  // app.use(flash())

  const port = configService.get('PORT') || 3000
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
}
bootstrap()
