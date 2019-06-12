import { RestResource } from './RestResource'

export interface Cutoff extends RestResource {
  name: string
  weight: number
}
