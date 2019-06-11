import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { DiskspaceResource } from '../src/Resources/DiskspaceResource'

describe('when using the CalendarResource class', () => {
  const sut = new DiskspaceResource(ENDPOINT, APIKEY, Logger.extend('diskspace-resource'))

  it('should get collection of diskspace instances', () => {
    expect(sut.list()).to.eventually.not.be.empty
  })
})
