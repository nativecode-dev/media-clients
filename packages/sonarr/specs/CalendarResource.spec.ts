import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using CalendarResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('calendar-resource'))

  it('should return no episodes', () => {
    expect(sut.calendar.list()).eventually.to.be.empty
  })

  it('should find first episode of the first season of 24', async () => {
    const episodes = await sut.calendar.list('11/05/2001', '11/06/2001')
    const found = episodes.filter(episode => episode.series.title === '24')
    expect(found.length).to.equal(1)
  })
})
