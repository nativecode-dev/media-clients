import { RestResource } from './RestResource'

export interface Allowed extends RestResource {
  name: string
  weight: number
}
