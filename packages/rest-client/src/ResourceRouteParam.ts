import { ResourceRouteParamType } from './ResourceRouteParamType'

export interface ResourceRouteParam {
  key: string
  type: ResourceRouteParamType
  value: any
}

export type ResourceRouteParams = ResourceRouteParam[]
