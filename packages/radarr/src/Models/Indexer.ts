import { IndexerField } from './IndexerField'

export interface Indexer {
  enableRss: boolean
  enableSearch: boolean
  supportsRss: boolean
  supportsSearch: boolean
  protocol: string
  name: string
  fields: IndexerField[]
  implementationName: string
  implementation: string
  configContract: string
  infoLink: string
  id: number
}
