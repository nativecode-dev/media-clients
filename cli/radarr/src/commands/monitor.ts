import { Global } from '@nativecode/media-cli'
import { Arguments, CommandModule } from 'yargs'

import client from '../client'

export interface MonitorOptions extends Global {
  id: string
  monitor: boolean
}

export class MonitorCommand implements CommandModule<{}, MonitorOptions> {
  builder = {
    monitor: {
      boolean: true,
      default: true,
    },
  }
  command = 'monitor <id> [monitor]'
  handler = async (args: Arguments<MonitorOptions>) => {
    const radarr = client(args)
    console.log(args)
  }
}

export default new MonitorCommand()
