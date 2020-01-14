import { Agent } from '../Models/Agent'

export interface AgentResponse {
  MediaContainer: {
    noHistory: '0'
    replaceParent: '0'
    size: '3'
    identifier: 'com.plexapp.system'
    Agent: Agent[]
  }
}
