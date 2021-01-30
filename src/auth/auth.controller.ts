import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { GoogleAuthGuard } from '../common/guards/googleauth.guard'

@Controller('auth')
export class AuthController {
  // TODO: Set client url when fixed
  private CLIENT_BASE_URL = 'http://localhost:8080'

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async signIn() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Res() res: Response) {
    res.redirect(this.CLIENT_BASE_URL)
  }

  @Get('current_user')
  getProfile(@Req() req: Request) {
    return { isCurrentUser: !!req.user }
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logOut(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(null)
    res.clearCookie('connect.sid')
    req.logOut()
    res.redirect(this.CLIENT_BASE_URL)
  }
}
