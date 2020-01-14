import { Device } from '../Models/Device'

export interface ResourcesResponse {
  MediaContainer: {
    size: string
    Device: Device[]
  }
}
