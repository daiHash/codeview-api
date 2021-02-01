import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { GuestSnippetsController } from './guest/guest.snippets.controller'
import { SnippetRepository } from './snippet.repository'
import { SnippetsController } from './snippets.controller'
import { SnippetsService } from './snippets.service'

@Module({
  imports: [TypeOrmModule.forFeature([SnippetRepository]), AuthModule],
  controllers: [SnippetsController, GuestSnippetsController],
  providers: [SnippetsService]
})
export class SnippetsModule {}
