import { IsNotEmpty } from 'class-validator'

export class CreateSnippetDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  snippetContentMD: string
}
