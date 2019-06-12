import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource } from '@nativecode/rest-client'

import compare from 'compare-versions'
import { fs } from '@nofrills/fs'

import { SystemStatus } from '../Models/SystemStatus'

export interface RadarrPackageOptions {
  version: string
}

export class SystemResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  status(): Promise<SystemStatus> {
    return this._get<SystemStatus>('system/status')
  }

  async supported(): Promise<boolean> {
    const path = fs.join(__dirname, '../../package.json')
    const packageInfo = await fs.json<RadarrPackageOptions>(path)
    const status = await this.status()
    return compare(status.version, packageInfo.version) < 1
  }
}
