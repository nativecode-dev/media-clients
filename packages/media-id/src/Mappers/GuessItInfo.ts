import { MediaInfo } from '../MediaInfo'
import { GuessItInfoShow } from './GuessItInfoShow'
import { GuessItInfoRelease } from './GuessItInfoRelease'

export interface GuessItInfo extends MediaInfo, Partial<GuessItInfoShow>, Partial<GuessItInfoRelease> {
  container: string
  mimetype: string
  title: string
  type: 'episode' | 'movie'
}
