import { ResourceParamType } from './ResourceParamType'

export interface ResourceParam {
  key: string
  type: ResourceParamType
  value: any
}

export type ResourceParams = ResourceParam[]
