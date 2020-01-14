import { Media } from './Media'

export interface Video {
  allowSync: string
  librarySectionID: string
  librarySectionTitle: string
  librarySectionUUID: string
  ratingKey: string
  key: string
  parentRatingKey: string
  grandparentRatingKey: string
  guid: string
  parentGuid: string
  grandparentGuid: string
  type: string
  title: string
  grandparentKey: string
  parentKey: string
  librarySectionKey: string
  grandparentTitle: string
  parentTitle: string
  contentRating: string
  summary: string
  index: string
  parentIndex: string
  year: string
  thumb: string
  art: string
  parentThumb: string
  grandparentThumb: string
  grandparentArt: string
  grandparentTheme: string
  duration: string
  originallyAvailableAt: string
  addedAt: string
  updatedAt: string
  Media: Media
  Writer: {
    id: string
  }
}
