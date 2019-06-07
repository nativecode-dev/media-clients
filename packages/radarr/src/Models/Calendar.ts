import { Image } from './Image'
import { Rating } from './Rating'

export interface Calendar {
  title: string
  sortTitle: string
  sizeOnDisk: number
  status: string
  overview: string
  inCinemas: Date
  physicalRelease: Date
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
  runtime: number
  lastInfoSync: Date
  cleanTitle: string
  imdbId: string
  tmdbId: number
  titleSlug: string
  genres: string[]
  tags: any[]
  added: Date
  ratings: Rating
  alternativeTitles: string[]
  qualityProfileId: number
  id: number
}
