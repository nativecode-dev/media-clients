import 'mocha'

import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the ProfileResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('profile-resource'))

  it('should validate version supported', async () => {
    const profiles = await sut.profile.list()
    expect(profiles).to.not.be.empty
  })
})
