import { Drive } from '../Models/Drive'

export interface DriveResponse {
  MediaContainer: {
    size: string
    Path: Drive
  }
}
