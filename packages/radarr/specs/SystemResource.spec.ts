import expect from './expect'
import Logger from './logging'

import compare from 'compare-versions'
import { fs } from '@nofrills/fs'

import { APIKEY, ENDPOINT } from './env'
import { SystemResource } from '../src/Resources/SystemResource'

interface RadarrPackageOptions {
  version: string
}

describe('when using the CalendarResource class', async () => {
  const packageInfo = await fs.json<RadarrPackageOptions>('package.json')
  const sut = new SystemResource(ENDPOINT, APIKEY, Logger.extend('system-resource'))

  it('should validate version supported', async () => {
    expect(sut.supported()).to.eventually.be.true
  })
})
