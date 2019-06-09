import { Image } from './Image'
import { Rating } from './Rating'

export interface Movie {
  physicalRelease?: Date
  title: string
  sortTitle: string
  sizeOnDisk: number
  status: string
  overview: string
  inCinemas: Date
  images: Image[]
  website: string
  downloaded: boolean
  year: number
  hasFile: boolean
  youTubeTrailerId: string
  studio: string
  path: string
  profileId: number
  monitored: boolean
  minimumAvailability: string
  runtime: number
  lastInfoSync: Date
  cleanTitle: string
  imdbId: string
  tmdbId: number
  titleSlug: string
  genres: string[]
  tags: string[]
  added: Date
  ratings: Rating
  alternativeTitles: string[]
  qualityProfileId: number
  id: number
}
