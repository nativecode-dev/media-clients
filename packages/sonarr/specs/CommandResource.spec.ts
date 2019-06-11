import expect from './expect'
import Logger from './logging'

import { step } from 'mocha-steps'

import { APIKEY, ENDPOINT } from './env'
import { Command } from '../src/Models/Command'
import { SonarrClient } from '../src/SonarrClient'

describe('when using CommandResource', () => {
  const sut = new SonarrClient(ENDPOINT, APIKEY, Logger.extend('command-resource'))

  let commands: Command[]
  let commandResult: Command

  step('should perform backup', async () => {
    commandResult = await sut.command.backup()
    expect(commandResult.name).to.equal('Backup')
  })

  step('should get single command', async () => {
    const result = await sut.command.command(commandResult.id)
    expect(commandResult.name).to.equal(result.name)
  })
})
