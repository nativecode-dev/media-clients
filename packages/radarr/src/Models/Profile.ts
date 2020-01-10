import { Cutoff } from './Cutoff'
import { FormatItem } from './FormatItem'
import { FormatCutoff } from './FormatCutoff'
import { RestResource } from './RestResource'
import { ProfileQuality } from './ProfileQuality'

export interface Profile extends RestResource {
  name: string
  cutoff: Cutoff
  prefereredTags: string
  items: ProfileQuality[]
  formatCutoff: FormatCutoff
  formatItems: FormatItem[]
  language: string
}
