import { ReleasePushProtocol } from './ReleasePushProtocol'

export interface ReleasePush {
  title: string
  downloadUrl: string
  protocol: ReleasePushProtocol
  publishDate: string
}
