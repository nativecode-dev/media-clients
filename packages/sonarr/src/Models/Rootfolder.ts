import { RestResource } from './RestResource'
import { RootfolderUnmapped } from './RootfolderUnmapped'

export interface Rootfolder extends RestResource {
  path: string
  freeSpace: number
  totalSpace: number
  unmappedFolders: RootfolderUnmapped
}
