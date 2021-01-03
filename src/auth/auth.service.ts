import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  signIn(req, res) {
    // TODO: Handle after signIn
    if (!req.user) {
      return 'No user from google'
    }
    // res.redirect('/')
    res.json({
      message: 'User Info from Google',
      user: req.user
    })
  }
}
