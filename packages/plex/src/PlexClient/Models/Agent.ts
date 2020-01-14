import { Language } from './Language'

export interface Agent {
  name: string
  hasPrefs: string
  identifier: string
  Language: Language[]
}
