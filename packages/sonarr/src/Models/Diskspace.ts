import { RestResource } from './RestResource'

export interface Diskspace extends RestResource {
  path: string
  label: string
  freeSpace: number
  totalSpace: number
}
