import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { CalendarResource } from '../src/Resources/CalendarResource'

describe('when using CalendarResource', () => {
  const sut = new CalendarResource(ENDPOINT, APIKEY, Logger.extend('calendar-resource'))

  it('should return no episodes', () => {
    expect(sut.list()).eventually.to.be.empty
  })

  it('should find first episode of the first season of 24', async () => {
    const episodes = await sut.list('11/06/2001', '11/06/2001')
    const found = episodes.filter(episode => episode.series.title === '24')
    expect(found.length).to.equal(1)
  })
})
