import { IsNotEmpty, IsString } from 'class-validator'

export class CreateSnippetDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsString({ each: true })
  @IsNotEmpty()
  snippetContentMD: string[]

  @IsString({ each: true })
  tags: string[]
}
