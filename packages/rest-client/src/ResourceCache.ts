import { RequestInit, Response } from 'node-fetch'

export interface ResourceCache {
  cache(request: RequestInit, buffer: Buffer): Promise<void>
  eject(request: RequestInit): Promise<boolean>
  exists(request: RequestInit): boolean
  expireAfter(request: RequestInit, milliseconds: number): Promise<void>
  get(request: RequestInit): Buffer
}
