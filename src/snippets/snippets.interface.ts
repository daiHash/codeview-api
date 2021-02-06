import { Snippet } from './snippet.entity'

export type SnippetByID = Snippet & { isUser: boolean | null }
