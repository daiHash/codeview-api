import { Snippet } from 'src/snippets/snippet.entity'
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

  @OneToMany((type) => Snippet, (snippet) => snippet.user, { eager: true })
  snippets: Snippet[]
}
