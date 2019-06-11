import { RestResource } from './RestResource'

export interface Quality2 extends RestResource {
  name: string
  source: string
  resolution: string
  modifier: string
}
