import yargsui from 'yargs-interactive'

import { Arguments, CommandModule } from 'yargs'

import { Output } from '../output'
import { Global } from '../options/global'

export class ConfigureCommand implements CommandModule<{}, Global> {
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

    Output(args, config, 'config', args.compact)
  }
}
