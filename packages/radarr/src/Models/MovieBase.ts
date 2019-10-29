import { Image } from './Image'
import { Rating } from './Rating'
import { RestResource } from './RestResource'
import { AlternativeTitle } from './AlternativeTitle'

export interface MovieBase extends RestResource {
  title: string
  alternativeTitles: AlternativeTitle[]
  secondaryYearSourceId: number
  sortTitle: string
  sizeOnDisk: number
  status: string
  overview: string
  inCinemas: Date
  images: Image[]
  downloaded: boolean
  year: number
  hasFile: boolean
  profileId: number
  pathState: string
  monitored: boolean
  minimumAvailability: string
  isAvailable: boolean
  folderName: string
  runtime: number
  tmdbId: number
  titleSlug: string
  genres: any[]
  tags: any[]
  added: Date
  ratings: Rating
  qualityProfileId: number
}
