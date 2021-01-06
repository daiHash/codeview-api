import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'
import { GoogleAuthGuard } from 'src/common/guards/googleauth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async signIn() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request) {
    return this.authService.signIn(req)
  }

  // test endpoint for session test
  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user
  }
}
