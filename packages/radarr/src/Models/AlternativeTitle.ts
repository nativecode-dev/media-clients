import { RestResource } from './RestResource'

export interface AlternativeTitle extends RestResource {
  sourceType: string
  movieId: number
  title: string
  sourceId: number
  votes: number
  voteCount: number
  language: string
}
