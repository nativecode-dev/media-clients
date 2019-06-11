import expect from './expect'
import Logger from './logging'

import { step } from 'mocha-steps'
import plimit from 'p-limit'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'
import { Backup } from '../src/Models/Backup'
import { rejects } from 'assert'

describe('when using BackupResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('backup-resource'))

  let backups: Backup[]

  step('should get list of backups', async () => {
    backups = await sut.backup.list()
    expect(backups).not.null
    expect(backups).not.undefined
  })

  step('should delete all backups if exists', function() {
    this.timeout(backups.length * 2000)

    const limit = plimit(1)
    const promises = backups.map(backup =>
      limit(
        () =>
          new Promise((resolve, reject) => {
            setTimeout(async () => {
              resolve(sut.backup.remove(backup.id).catch(error => reject(error)))
            }, 0)
          }),
      ),
    )
    expect(Promise.all(promises)).to.eventually.be.fulfilled
  })
})
