import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as helmet from 'helmet'
import * as session from 'express-session'
import * as passport from 'passport'
import { TypeormStore } from 'connect-typeorm'
import { getRepository } from 'typeorm'
import { TypeORMSession } from './auth/session/session.entity'
// import flash = require('connect-flash')
// import createMemoryStore = require('memorystore')
// const MemoryStore = createMemoryStore(session)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const sessionRepo = getRepository(TypeORMSession)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')

  app.use(helmet())

  app.enableCors({
    origin: ['http://localhost:8080'],
    credentials: true
  })

  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 2592000 // 30 days
      },
      store: new TypeormStore().connect(sessionRepo)
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())
  // app.use(flash())

  const port = configService.get('PORT') || 3000
  await app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })
}
bootstrap()
