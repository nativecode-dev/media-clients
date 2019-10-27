import { CommandModule, Arguments } from 'yargs'

export interface ListOptions {
  series?: string
  season?: string
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  command = 'list [series] [season]'
  build = {}
  handler = (args: Arguments<ListOptions>): void => {
    console.log(args)
  }
}

export default new ListCommand()
