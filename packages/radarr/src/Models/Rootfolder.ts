import { RestResource } from './RestResource'

export interface Rootfolder extends RestResource {
  path: string
  freeSpace: number
  totalSpace: number
}
