import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the CalendarResource class', async () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('system-resource'))

  it('should validate version supported', async () => {
    expect(sut.system.supported()).to.eventually.be.false
  })
})
