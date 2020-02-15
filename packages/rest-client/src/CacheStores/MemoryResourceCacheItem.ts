import { RequestInit } from 'node-fetch'

import { TimeSpanElapsed } from '../utils/TimeSpanElapsed'

export interface MemoryResourceCacheItem {
  request: RequestInit
  buffer: Buffer
  timestamp: TimeSpanElapsed
}
