import { Image } from './Image'
import { Rating } from './Rating'
import { MovieFile } from './MovieFile'
import { RestResource } from './RestResource'
import { AlternativeTitle } from './AlternativeTitle'

export interface Movie extends RestResource {
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
  youTubeTrailerId: string
  studio: string
  path: string
  profileId: number
  pathState: string
  monitored: boolean
  minimumAvailability: string
  isAvailable: boolean
  folderName: string
  runtime: number
  lastInfoSync: Date
  cleanTitle: string
  imdbId: string
  tmdbId: number
  titleSlug: string
  genres: any[]
  tags: any[]
  added: Date
  ratings: Rating
  movieFile: MovieFile
  qualityProfileId: number
}
