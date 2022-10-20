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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const sessionRepo = getRepository(TypeORMSession)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')

  app.use(helmet())

  app.enableCors({
    origin: configService.get('CLIENT_BASE_URL'),
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })

  app.use(cookieParser())

  const userSession: session.SessionOptions = {
    secret: configService.get('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    store: new TypeormStore().connect(sessionRepo)
  }

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    userSession.cookie.secure = true
    userSession.cookie.sameSite = 'none'
    userSession.proxy = true
  }

  app.use(session(userSession))

  app.use(passport.initialize())
  app.use(passport.session())

  const port = process.env.PORT || 3000
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at http://localhost:${port}`)
  })
}
bootstrap()
