import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { Snippet } from './snippet.entity'
import { SnippetsService } from './snippets.service'

@Controller('snippets')
@UseGuards(AuthenticatedGuard)
export class SnippetsController {
  constructor(private snippetsService: SnippetsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
    @GetUser() user: User
  ): Promise<Snippet> {
    return this.snippetsService.createSnippet(createSnippetDto, user)
  }
}
