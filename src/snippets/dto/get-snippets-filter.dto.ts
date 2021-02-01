import { IsOptional, IsNotEmpty } from 'class-validator'

export class GetSnippetsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  tags: string

  @IsOptional()
  @IsNotEmpty()
  search: string

  @IsOptional()
  @IsNotEmpty()
  size: number
}
