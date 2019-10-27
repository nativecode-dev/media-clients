import { CommandModule, Arguments } from 'yargs'

export interface ListOptions {
  movie?: string
  year?: number
}

export class ListCommand implements CommandModule<{}, ListOptions> {
  command = 'list [movie]'
  build = {}
  handler = (args: Arguments<ListOptions>): void => {
    console.log(args)
  }
}

export default new ListCommand()
