import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe
} from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { GetSnippetsFilterDto } from '../dto/get-snippets-filter.dto'
import { Snippet } from '../snippet.entity'
import { SnippetsService } from '../snippets.service'

@Controller('guest')
export class GuestSnippetsController {
  constructor(private snippetsService: SnippetsService) {}

  @Get('snippets')
  getAllLatestGuestSnippets(
    @Query(ValidationPipe) filterDto: GetSnippetsFilterDto
  ): Promise<Snippet[]> {
    return this.snippetsService.getAllGuestSnippets(filterDto)
  }

  @Get('/snippet/:id')
  getSnippetById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Snippet> {
    return this.snippetsService.getSnippetById(id, user)
  }
}
