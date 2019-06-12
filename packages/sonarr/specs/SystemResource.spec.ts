import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using the CalendarResource class', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('system-resource'))

  it('should validate version supported', () => {
    expect(sut.system.supported()).to.eventually.be.false
  })
})
