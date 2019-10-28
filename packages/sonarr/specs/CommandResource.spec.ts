import 'mocha'

import expect from './expect'
import Logger from './logging'

import { xstep } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { Command } from '../src/Models/Command'
import { SonarrClient } from '../src/SonarrClient'

describe('when using CommandResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('command-resource'))

  let backup: Command

  xstep('should perform backup', async () => {
    backup = await sut.command.backup()
    expect(backup.name).to.equal('Backup')
  }).timeout(5000)

  xstep('should get single command', async () => {
    const result = await sut.command.command(backup.id)
    expect(backup.name).to.equal(result.name)
  }).timeout(5000)
})
