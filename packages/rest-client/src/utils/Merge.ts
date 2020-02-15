import deepmerge from 'deepmerge'

import { Dedupe } from './Dedupe'
import { DeepPartial } from './DeepPartial'

export function Merge<T>(objects: Array<DeepPartial<T>>): T {
  const partials = objects.map(item => item as Partial<T>)
  const merged = deepmerge.all<T>(partials, { arrayMerge: Dedupe })
  return merged
}
