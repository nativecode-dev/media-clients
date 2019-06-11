import expect from './expect'
import Logger from './logging'

import { xstep } from 'mocha-steps'
import plimit from 'p-limit'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'
import { Backup } from '../src/Models/Backup'

describe('when using BackupResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('backup-resource'))

  let backups: Backup[]

  xstep('should get list of backups', async () => {
    backups = await sut.backup.list()
    expect(backups).not.null
    expect(backups).not.undefined
  })

  xstep('should delete all existing backups', function() {
    this.timeout(backups.length * 2000)

    const limit = plimit(1)
    const promises = backups.map(backup => limit(() => sut.backup.remove(backup.id)))
    expect(Promise.all(promises)).to.eventually.be.fulfilled
  })
})
