import { Quality } from './Quality'
import { RestResource } from './RestResource'
import { ProfileQuality } from './ProfileQuality'

export interface Profile extends RestResource {
  name: string
  upgradeAllowed: boolean
  cutoff: Quality
  items: ProfileQuality
}
