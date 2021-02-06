import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
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
}
