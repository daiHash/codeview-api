import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'
import { SessionSerializer } from './session/session.serializer'

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
  exports: [AuthService]
})
export class AuthModule {}
