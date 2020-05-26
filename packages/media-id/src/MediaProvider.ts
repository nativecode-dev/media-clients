import { Subject } from 'rxjs'
import { fs } from '@nofrills/fs'

import { MediaInfo } from './MediaInfo'
import { MediaFilter } from './MediaFilter'
import { MediaMapper } from './MediaMapper'

export class MediaProvider<T extends MediaInfo> extends Subject<T> {
  async entries(cwd: string, filters: Array<MediaFilter>, identifiers: Array<MediaMapper<T>>): Promise<T[]> {
    const filenames = await fs.list(cwd)
    const filtered = filenames.filter((filename) => filters.some((filter) => filter(filename)))

    const results = filtered.reduce<Promise<T[]>>(async (result, filename) => {
      const collection = await result
      const identified = await identifiers.reduce<Promise<T>>((_, identifier) => identifier(filename), Promise.resolve({} as T))
      this.next(identified)
      return collection.concat([identified])
    }, Promise.resolve([]))

    this.complete()

    return results
  }
}
