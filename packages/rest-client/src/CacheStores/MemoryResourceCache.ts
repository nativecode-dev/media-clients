import btoa from 'btoa'

import { RequestInit } from 'node-fetch'

import { Merge } from '../utils/Merge'
import { TimeSpan } from '../utils/TimeSpan'
import { ResourceCache } from '../ResourceCache'
import { MemoryResourceCacheItem } from './MemoryResourceCacheItem'
import { MemoryResourceCacheOptions } from './MemoryResourceCacheOptions'

const DefaultMemoryResourceCacheOptions: MemoryResourceCacheOptions = {
  interval: 250,
  timeout: 5000,
}

export class MemoryResourceCache implements ResourceCache {
  private readonly options: MemoryResourceCacheOptions
  private readonly store: Map<string, MemoryResourceCacheItem> = new Map()

  constructor(options: Partial<MemoryResourceCacheOptions> = {}) {
    this.options = Merge<MemoryResourceCacheOptions>(DefaultMemoryResourceCacheOptions, options)
  }

  cache(request: RequestInit, buffer: Buffer): Promise<void> {
    const key = JSON.stringify(request)
    this.store.set(key, this.createCache(request, buffer))
    return Promise.resolve()
  }

  eject(request: RequestInit): Promise<boolean> {
    return Promise.resolve(this.store.delete(this.createKey(request)))
  }

  expireAfter(request: RequestInit, milliseconds: number): Promise<void> {
    return new Promise<void>((resolve, reject) =>
      setTimeout(async () => {
        if (await this.eject(request)) {
          resolve()
        } else {
          reject(new Error(`failed to eject item: ${this.createKey(request)}`))
        }
      }, milliseconds),
    )
  }

  exists(request: RequestInit): boolean {
    const key = this.createKey(request)

    if (this.store.has(key)) {
      const value = this.store.get(key)

      if (value) {
        const expired = value.timestamp() >= this.options.timeout

        if (expired) {
          return this.store.delete(key) && expired
        }

        return true
      }
    }

    return false
  }

  get(request: RequestInit): Buffer {
    const key = this.createKey(request)
    const value = this.store.get(key)

    if (value) {
      return value.buffer
    }

    throw new Error(`Key does not exist: ${key}`)
  }

  private cleanup(): void {
    Array.from(this.store.values()).map(item => {
      if (item.timestamp() >= this.options.timeout) {
        this.store.delete(this.createKey(item.request))
      }
    })
  }

  private createCache(request: RequestInit, buffer: Buffer): MemoryResourceCacheItem {
    return { request, buffer, timestamp: TimeSpan() }
  }

  private createKey(request: RequestInit): string {
    return btoa(JSON.stringify(request))
  }
}
