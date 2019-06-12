import { Cutoff } from './Cutoff'
import { Allowed } from './Allowed'
import { RestResource } from './RestResource'

export interface Value extends RestResource {
  name: string
  allowed: Allowed[]
  cutoff: Cutoff
}
