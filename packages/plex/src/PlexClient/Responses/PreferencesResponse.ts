import { Setting } from '../Models/Setting'

export interface PreferencesResponse {
  MediaContainer: {
    size: string
    Setting: Setting[]
  }
}
