import { Video } from '../Models/Video'

export interface RecentlyAddedResponse {
  MediaContainer: {
    size: string
    allowSync: string
    identifier: string
    mediaTagPrefix: string
    mediaTagVersion: string
    mixedParents: string
    Video: Video[]
  }
}
