import { DirectorySection } from '../Models/DirectorySection'

export interface LibraryResponse {
  MediaContainer: {
    size: string
    allowSync: string
    art: string
    content: string
    identifier: string
    librarySectionID: string
    mediaTagPrefix: string
    mediaTagVersion: string
    thumb: string
    title1: string
    viewGroup: string
    viewMode: string
    Directory: DirectorySection[]
  }
}
