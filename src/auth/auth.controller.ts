import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { GoogleAuthGuard } from '../common/guards/googleauth.guard'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async signIn() {
    return
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Res() res: Response) {
    res.redirect(process.env.CLIENT_BASE_URL)
  }

  @Get('current_user')
  getProfile(@Req() req: Request) {
    if (!req.user) {
      return { isCurrentUser: false }
    }

    const { username, avatarUrl, snippets, id } = req.user as User
    const currentUser = {
      id,
      username,
      avatarUrl,
      snippets
    }

    return { isCurrentUser: true, ...currentUser }
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
