import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { CalendarResource } from '../src/Resources/CalendarResource'

describe('when using the CalendarResource class', () => {
  const sut = new CalendarResource(ENDPOINT, APIKEY, Logger.extend('calendar-resource'))

  it('should list calendar events', () => {
    expect(sut.list()).to.eventually.be.empty
  })
})
