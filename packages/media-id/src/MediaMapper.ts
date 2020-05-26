import { MediaInfo } from './MediaInfo'

export interface MediaMapper<T extends MediaInfo> {
  (filename: string): Promise<T>
}
