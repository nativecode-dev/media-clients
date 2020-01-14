import { Video } from '../Models/Video'

export interface OnDeckResponse {
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
