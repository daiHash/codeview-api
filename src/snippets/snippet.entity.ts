import { User } from 'src/auth/user.entity'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  snippetContentMD: string

  @ManyToOne(() => User, (user) => user.snippets, { eager: false })
  user: User
}
