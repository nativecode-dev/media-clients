import { Connection } from './Connection'

export interface Device {
  name: string
  product: string
  productVersion: string
  platform: string
  platformVersion: string
  device: string
  clientIdentifier: string
  createdAt: string
  lastSeenAt: string
  provides: string
  owned: string
  accessToken: string
  publicAddress: string
  httpsRequired: string
  synced: string
  relay: string
  dnsRebindingProtection: string
  natLoopbackSupported: string
  publicAddressMatches: string
  presence: string
  Connection: Connection[]
}
