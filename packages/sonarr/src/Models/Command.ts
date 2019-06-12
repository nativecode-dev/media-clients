import { RestResource } from './RestResource'

export interface Command extends RestResource {
  name: string
  startedOn: Date
  stateChangeTime: Date
  sendUpdatesToClient: boolean
  state: string
}
