import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'
import { Snippet } from './snippet.entity'
import { SnippetsService } from './snippets.service'

@Controller('snippets')
@UseGuards(AuthenticatedGuard)
export class SnippetsController {
  constructor(private snippetsService: SnippetsService) {}

  @Get()
  getSnippets(
    @Query(ValidationPipe) filterDto: GetSnippetsFilterDto,
    @GetUser() user: User
  ): Promise<Snippet[]> {
    return this.snippetsService.getSnippets(filterDto, user)
  }

  @Get('/:id')
  getSnippetById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<Snippet> {
    return this.snippetsService.getSnippetById(id, user)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
    @GetUser() user: User
  ): Promise<Snippet> {
    return this.snippetsService.createSnippet(createSnippetDto, user)
  }

  @Patch('/:id')
  updateSnippet(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body() createSnippetDto: CreateSnippetDto
  ): Promise<Snippet> {
    return this.snippetsService.updateSnippet(id, user, createSnippetDto)
  }

  @Delete('/:id')
  deleteSnippet(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.snippetsService.deleteSnippet(id, user)
  }
}
