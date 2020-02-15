import { RequestInit, Response } from 'node-fetch'

import { ResourceCache } from '../ResourceCache'

export class NullResourceCache implements ResourceCache {
  cache(request: RequestInit, buffer: Buffer): Promise<void> {
    return Promise.resolve()
  }

  eject(request: RequestInit): Promise<boolean> {
    return Promise.resolve(true)
  }

  expireAfter(request: RequestInit, milliseconds: number): Promise<void> {
    return Promise.resolve()
  }

  exists(request: RequestInit): boolean {
    return false
  }

  get(request: RequestInit): Buffer {
    throw new Error(`Method not implemented.`)
  }
}

export const DefaultResourceCache = new NullResourceCache()
