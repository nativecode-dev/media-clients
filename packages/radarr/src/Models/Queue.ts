import { RestResource } from './RestResource'

export interface Queue extends RestResource {
  movie: {
    title: string
    alternativeTitles: [
      {
        sourceType: string
        movieId: number
        title: string
        sourceId: number
        votes: number
        voteCount: number
        language: string
        id: number
      },
    ]
    secondaryYearSourceId: number
    sortTitle: string
    sizeOnDisk: number
    status: string
    overview: string
    inCinemas: string
    physicalRelease: string
    physicalReleaseNote: string
    images: {
      coverType: string
      url: string
    }[]
    website: string
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
    lastInfoSync: string
    cleanTitle: string
    imdbId: string
    tmdbId: number
    titleSlug: string
    genres: string[]
    tags: number[]
    added: string
    ratings: {
      votes: number
      value: number
    }
    movieFile: {
      movieId: number
      relativePath: string
      size: number
      dateAdded: string
      releaseGroup: string
      quality: {
        quality: {
          id: number
          name: string
          source: string
          resolution: string
          modifier: string
        }
        customFormats: string[]
        revision: {
          version: number
          real: number
        }
      }
      edition: string
      id: number
    }
    qualityProfileId: number
    id: number
  }
  quality: {
    quality: {
      id: number
      name: string
      source: string
      resolution: string
      modifier: string
    }
    customFormats: string[]
    revision: {
      version: number
      real: number
    }
  }
  size: number
  title: string
  sizeleft: number
  timeleft: string
  estimatedCompletionTime: string
  status: string
  trackedDownloadStatus: string
  statusMessages: {
    title: string
    messages: string[]
  }[]
  downloadId: string
  protocol: string
}
