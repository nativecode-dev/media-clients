import { Part } from './Part'

export interface Media {
  id: string
  duration: string
  bitrate: string
  width: string
  height: string
  aspectRatio: string
  audioChannels: string
  audioCodec: string
  videoCodec: string
  videoResolution: string
  container: string
  videoFrameRate: string
  videoProfile: string
  Part: Part
}
