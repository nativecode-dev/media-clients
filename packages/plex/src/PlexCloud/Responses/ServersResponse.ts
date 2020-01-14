import { Server } from '../Models/Server'

export interface ServersResponse {
  MediaContainer: {
    friendlyName: string
    identifier: string
    machineIdentifier: string
    size: string
    Server: Server[]
  }
}
