import 'mocha'

import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { RadarrClient } from '../src/RadarrClient'

describe('when using the DiskspaceResource class', () => {
  const sut = new RadarrClient(ENDPOINT, APIKEY, Logger.extend('diskspace-resource'))

  it('should get collection of diskspace instances', async () => {
    const diskspace = await sut.diskspace.list()
    expect(diskspace).to.not.be.empty
  })
})
