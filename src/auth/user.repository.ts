import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { User } from './user.entity'
import { UserData } from './user.interface'
import { Request, Response } from 'express'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private CLIENT_BASE_URL = 'http://localhost:8080'
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:8080'
  //     : 'https://TODO:Addprodurl'

  async signIn(req: Request, res: Response): Promise<void> {
    const { username, avatarUrl, googleID } = req.user as UserData
    const isUser = await this.findOne({ googleID })

    if (!isUser) {
      const newUser = new User()
      newUser.googleID = googleID
      newUser.username = username
      newUser.avatarUrl = avatarUrl
      try {
        await newUser.save()
        res.redirect(this.CLIENT_BASE_URL)
      } catch (error) {
        if (error.code === '23505') {
          // Duplicate user key
          throw new ConflictException('User already exists')
        } else {
          console.error({ error })
          throw new InternalServerErrorException()
        }
      }
    }

    res.redirect(this.CLIENT_BASE_URL)
  }

  async logOut(req: Request, res: Response): Promise<void> {
    req.session.destroy(null)
    res.clearCookie('connect.sid')
    req.logOut()
    res.redirect(this.CLIENT_BASE_URL)
  }
}
