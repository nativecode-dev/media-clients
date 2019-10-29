import { MovieFile } from './MovieFile'
import { MovieBase } from './MovieBase'

export interface Movie extends MovieBase {
  youTubeTrailerId: string
  studio: string
  path: string
  lastInfoSync: Date
  cleanTitle: string
  imdbId: string
  movieFile: MovieFile
}
