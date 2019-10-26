import 'mocha'

import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the CalendarResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('system-resource'))

  it('should validate version supported', () => {
    expect(sut.system.supported()).to.eventually.be.false
  })
})
