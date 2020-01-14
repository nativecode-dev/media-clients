import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using the SystemResource class', () => {
  const sut = new SonarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should validate version supported', async () => {
    const supported = await sut.system.supported()
    expect(supported).to.be.true
  })
})
