import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { User } from '../user.entity'
import { AuthService } from '../auth.service'

export type Done = (err: Error, user: User) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super()
  }

  serializeUser(user: User, done: Done): void {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done): Promise<void> {
    const userDB = await this.authService.findUser(user.googleID)
    return userDB ? done(null, userDB) : done(null, null)
  }
}
