import { Series } from './Series'
import { Episode } from './Episode'

export interface ParsedEpisodeInfo {
  title: string
  parsedEpisodeInfo: {
    releaseTitle: string
    seriesTitle: string
    seriesTitleInfo: {
      title: string
      titleWithoutYear: string
      year: number
    }
    quality: {
      quality: {
        id: number
        name: string
      }
      revision: {
        version: number
        real: number
      }
    }
    seasonNumber: number
    episodeNumbers: number[]
    absoluteEpisodeNumbers: number[]
    language: string
    fullSeason: boolean
    special: boolean
    releaseGroup: string
    releaseHash: string
    isDaily: boolean
    isAbsoluteNumbering: boolean
    isPossibleSpecialEpisode: boolean
  }
  series: Series
  episodes: Episode[]
}
