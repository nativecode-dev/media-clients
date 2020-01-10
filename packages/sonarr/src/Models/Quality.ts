import { RestResource } from './RestResource'

export interface Quality extends RestResource {
  name: string
  source: string
  resolution: number
}
