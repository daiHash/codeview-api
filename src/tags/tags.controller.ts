import { Controller, Get } from '@nestjs/common'
import { TagsService } from './tags.service'

@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Get()
  getAllTags() {
    return this.tagService.getAllTags()
  }
}
