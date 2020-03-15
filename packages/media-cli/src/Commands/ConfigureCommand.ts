import yargsui from 'yargs-interactive'

import { Arguments } from 'yargs'

import { BaseCommand } from './BaseCommand'
import { Global } from '../CommandOptions/Global'
import { ConfigPath, SaveConfig } from '../Config'

export class ConfigureCommand extends BaseCommand<Global> {
  constructor(private readonly configname: string) {
    super()
  }

  aliases = []
  builder = {}
  command = 'configure'
  describe = 'configure options'

  async handler(args: Arguments<Global>) {
    const results = await Promise.resolve(
      yargsui().interactive({
        interactive: {
          default: true,
        },
        apikey: {
          default: args.apikey,
          describe: 'apikey',
          prompt: 'always',
          type: 'input',
        },
        endpoint: {
          default: args.endpoint,
          describe: 'endpoint',
          prompt: 'always',
          type: 'input',
        },
      }),
    )

    const config = {
      apikey: results.apikey,
      endpoint: results.endpoint,
    }

    const filepath = await ConfigPath(this.configname)
    await SaveConfig(filepath, config)

    console.log(`Saved configuration to ${filepath}`)
  }
}
