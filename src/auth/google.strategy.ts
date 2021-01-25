import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { UserData } from './user.interface'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const { photos, username, displayName, id: googleID } = profile

    const user: UserData = {
      username: username ?? displayName,
      avatarUrl: photos[0].value,
      accessToken,
      googleID
    }
    done(null, user)
  }
}
