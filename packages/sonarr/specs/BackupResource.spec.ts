import 'mocha'

import expect from './expect'
import plimit from 'p-limit'

import { xstep } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { SonarrClient } from '../src/SonarrClient'
import { Backup } from '../src/Models/Backup'

describe('when using BackupResource', () => {
  const sut = new SonarrClient({ apikey: APIKEY, host: ENDPOINT })

  let backups: Backup[]

  xstep('should get list of backups', async () => {
    backups = await sut.backup.list()
    expect(backups).not.null
    expect(backups).not.undefined
  })

  xstep('should delete all existing backups', () => {
    const limit = plimit(1)
    const promises = backups.map(backup => limit(() => sut.backup.remove(backup.id)))
    expect(Promise.all(promises)).to.eventually.be.fulfilled
  })
})
