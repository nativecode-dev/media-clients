import { Server } from '../Models/Server'

export interface ServersResponse {
  MediaContainer: {
    size: string
    Server: Server[]
  }
}
