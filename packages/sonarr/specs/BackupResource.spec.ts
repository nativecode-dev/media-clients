import expect from './expect'
import Logger from './logging'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'

describe('when using BackupResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('backup-resource'))

  it('should get list of backups', async () => {
    expect(sut.backup.list()).to.eventually.be.empty
  })
})
