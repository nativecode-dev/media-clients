import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource } from '@nativecode/rest-client'

import compare from 'compare-versions'
import { fs } from '@nofrills/fs'

import { SystemStatus } from './SystemStatus'
import { RadarrPackageOptions } from '../RadarrPackageOptions'

export class SystemResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  status(): Promise<SystemStatus> {
    return this._get<SystemStatus>('system/status')
  }

  async supported(): Promise<boolean> {
    const packageInfo = await fs.json<RadarrPackageOptions>('package.json')
    const status = await this.status()
    return compare(status.version, packageInfo.version) < 1
  }
}
