import 'mocha'

import expect from './expect'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the ProfileResource class', () => {
  const sut = new RadarrClient({ apikey: APIKEY, host: ENDPOINT })

  it('should validate version supported', async () => {
    const profiles = await sut.profile.list()
    expect(profiles).to.not.be.empty
  })
})
