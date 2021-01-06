import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'
import { GoogleAuthGuard } from 'src/common/guards/googleauth.guard'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleStrategy } from './google.strategy'
import { SessionSerializer } from './session.serializer'
import { UserRepository } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    SessionSerializer
    // GoogleAuthGuard,
    // AuthenticatedGuard
  ]
})
export class AuthModule {}
