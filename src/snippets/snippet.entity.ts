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

  // TODO: Think about the data here array or just string text
  @Column('text', { array: true })
  snippetContentMD: string[]

  @ManyToOne(() => User, (user) => user.snippets, { eager: false })
  user: User

  @Column()
  userId: number
}
