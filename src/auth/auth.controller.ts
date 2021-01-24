import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { GoogleAuthGuard } from '../common/guards/googleauth.guard'

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
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.authService.signIn(req, res)
  }

  @Get('/current_user')
  getProfile(@Req() req: Request) {
    return { isCurrentUser: !!req.user }
  }

  @Get('/logout')
  @UseGuards(AuthenticatedGuard)
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.authService.logOut(req, res)
  }
}
