import { TranscodeSession } from '../Models/TranscodeSession'

export interface TranscodersResponse {
  MediaContainer: {
    size: string
    TranscodeSession: TranscodeSession
  }
}
