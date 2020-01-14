import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using SeriesResource', () => {
  const sut = new SonarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should get list of shows', async () => {
    const shows = await sut.series.list()
    expect(shows).to.not.be.empty
  })

  it('should get single shows', async () => {
    const shows = await sut.series.id(1)
    expect(shows.title).to.equal('Transformers')
  })
})
