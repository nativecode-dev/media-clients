import { Allowed } from './Allowed'
import { RestResource } from './RestResource'
import { Profile } from './Profile'

export interface Value extends RestResource {
  name: string
  allowed: Allowed[]
  cutoff: Profile
}
