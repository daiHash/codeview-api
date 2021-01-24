import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as session from 'express-session'
// import flash = require('connect-flash')
import * as passport from 'passport'
import createMemoryStore = require('memorystore')
const MemoryStore = createMemoryStore(session)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')

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
      store: new MemoryStore({
        checkPeriod: 86400000
      })
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
