import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the CalendarResource class', () => {
  const sut = new RadarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should list calendar events', async () => {
    const calendar = await sut.calendar.list()
    expect(calendar).to.be.empty
  })

  xit('should list releases on start date', async () => {
    const calendar = await sut.calendar.list('12/13/2010')
    expect(calendar).to.not.be.empty
  })

  it('should list releases between dates', async () => {
    const calendar = await sut.calendar.list('12/12/2010', '12/14/2010')
    expect(calendar).to.not.be.empty
  })
})
