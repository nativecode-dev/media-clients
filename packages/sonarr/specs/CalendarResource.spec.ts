import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using CalendarResource', () => {
  const sut = new SonarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should return no episodes', async () => {
    const calendar = await sut.calendar.list()
    expect(calendar).to.be.empty
  })

  xit('should find first episode of the first season of 24', async () => {
    const episodes = await sut.calendar.list('11/05/2001', '11/07/2001')
    const found = episodes.filter(episode => episode.series.title === '24')
    expect(found.length).to.equal(1)
  })
})
