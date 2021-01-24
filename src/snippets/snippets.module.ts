import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from '../auth/auth.module'
import { SnippetRepository } from './snippet.repository'
import { SnippetsController } from './snippets.controller'
import { SnippetsService } from './snippets.service'

@Module({
  imports: [TypeOrmModule.forFeature([SnippetRepository]), AuthModule],
  controllers: [SnippetsController],
  providers: [SnippetsService]
})
export class SnippetsModule {}
