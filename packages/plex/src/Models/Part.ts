import { Stream } from './Stream'

export interface Part {
  id: string
  key: string
  duration: string
  file: string
  size: string
  container: string
  videoProfile: string
  Stream: Stream[]
}
