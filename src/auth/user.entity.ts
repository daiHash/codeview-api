import { Snippet } from '../snippets/snippet.entity'
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'

@Entity()
@Unique(['googleID'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  googleID: string

  @Column()
  username: string

  @Column()
  avatarUrl: string

  @OneToMany(() => Snippet, (snippet) => snippet.user, {
    eager: true,
    nullable: true
  })
  snippets: Snippet[] | null
}
