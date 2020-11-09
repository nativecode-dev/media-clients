import { PlexOptions } from '../PlexOptions'

export interface PlexClientOptions extends PlexOptions {
  host: string
  port: number
  secure: boolean
}
