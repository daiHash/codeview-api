import { User } from '../auth/user.entity'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Snippet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column('text', { array: true })
  snippetContentMD: string[]

  @Index()
  @ManyToOne(() => User, (user) => user.snippets, { eager: false })
  user: User

  @Column()
  userId: number

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number

  @Column('text', { array: true })
  tags: string[]

  @Column('jsonb', { default: [] })
  favorites: Array<{ userId: number; username: string }>
}
