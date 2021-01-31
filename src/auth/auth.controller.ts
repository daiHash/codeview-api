import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { GoogleAuthGuard } from '../common/guards/googleauth.guard'

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async signIn() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    res.status(200)
    // res.redirect(process.env.CLIENT_BASE_URL)
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
    res.redirect(process.env.CLIENT_BASE_URL)
  }
}
