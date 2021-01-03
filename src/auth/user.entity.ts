import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  googleID: string

  @Column()
  username: string

  @Column()
  avatarUrl: string
}
