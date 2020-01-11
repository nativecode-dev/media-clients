import yargsui from 'yargs-interactive'

import { Arguments, CommandModule } from 'yargs'

import { Global } from '../options/global'
import { ConfigPath, SaveConfig } from '../config'

export class ConfigureCommand implements CommandModule<{}, Global> {
  constructor(private readonly configname: string) {}

  command = 'configure'
  describe = 'configure options'
  handler = async (args: Arguments<Global>) => {
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
