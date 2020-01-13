import { Directory } from '../Models/Directory'

export interface LibrariesResponse {
  MediaContainer: {
    size: string
    allowSync: string
    identifier: string
    mediaTagPrefix: string
    mediaTagVersion: string
    title1: string
    Directory: Directory[]
  }
}
