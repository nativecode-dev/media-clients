import { Image } from './Image'

export interface AddMovie {
  title: string
  qualityProfileId: number
  titleSlug: string
  images: Image[]
  tmdbId: number
  year: number
  path: string
  monitored?: boolean
  addOptions?: {
    searchForMovie: boolean
  }
}
