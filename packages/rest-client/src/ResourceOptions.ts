import { ResourceHeader } from './ResourceHeader'

export interface ResourceOptions {
  credentials?: 'omit' | 'same-origin' | 'include'
  headers: ResourceHeader[]
}
