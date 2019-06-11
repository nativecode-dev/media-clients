import { BackupType } from './BackupType'
import { RestResource } from './RestResource'

export interface Backup extends RestResource {
  name: string
  path: string
  type: BackupType
  time: Date
}
