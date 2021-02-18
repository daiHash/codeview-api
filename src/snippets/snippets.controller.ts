import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { TagsService } from '../tags/tags.service'
import { GetUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { CreateSnippetDto } from './dto/create-snippet.dto'
import { GetSnippetsFilterDto } from './dto/get-snippets-filter.dto'
import { Snippet } from './snippet.entity'
import { SnippetByID } from './snippets.interface'
import { SnippetsService } from './snippets.service'

@Controller('snippets')
export class SnippetsController {
  constructor(
    private snippetsService: SnippetsService,
    private tagService: TagsService
  ) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
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
  ): Promise<SnippetByID> {
    return this.snippetsService.getSnippetById(id, user)
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
    @GetUser() user: User
  ): Promise<Snippet> {
    const { tags } = createSnippetDto
    if (tags.length > 0) {
      tags.forEach(async (tag) => {
        await this.tagService.createTag(tag)
      })
    }

    return this.snippetsService.createSnippet(createSnippetDto, user)
  }

  @Put('/:id')
  @UseGuards(AuthenticatedGuard)
  updateSnippet(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body() createSnippetDto: CreateSnippetDto
  ): Promise<Snippet> {
    const { tags } = createSnippetDto
    if (tags.length > 0) {
      tags.forEach(async (tag) => {
        await this.tagService.createTag(tag)
      })
    }
    return this.snippetsService.updateSnippet(id, user, createSnippetDto)
  }

  @Delete('/:id')
  @UseGuards(AuthenticatedGuard)
  deleteSnippet(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.snippetsService.deleteSnippet(id, user)
  }

  @Put('/:id/favorite')
  @UseGuards(AuthenticatedGuard)
  updateSnippetFavorite(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body() isFavorite: { isFavorite: boolean }
  ): Promise<Snippet> {
    return this.snippetsService.updateSnippetFavorite(id, user, isFavorite)
  }
}
