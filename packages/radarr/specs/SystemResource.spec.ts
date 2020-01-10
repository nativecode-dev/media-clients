import 'mocha'

import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the SystemResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('system-resource'))

  it('should validate version supported', async () => {
    const supported = await sut.system.supported()
    expect(supported).to.be.true
  })
})
