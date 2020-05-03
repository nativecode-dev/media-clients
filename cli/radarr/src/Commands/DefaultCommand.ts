import { Arguments, Argv } from 'yargs'
import { BaseCommand } from '@nativecode/media-cli'

import { SearchCommand } from './SearchCommand'
import { RadarrOptions } from '../Options/RadarrOptions'
import { SearchOptions } from '../Options/SearchOptions'
import { UnmonitorCommand } from './UnmonitorCommand'

export class DefaultCommand extends BaseCommand<RadarrOptions> {
  aliases = ['command']
  command = '$0 <command>'

  builder = (args: Argv<{}>): Argv<RadarrOptions> => {
    return args.command<SearchOptions>(new SearchCommand()).command<RadarrOptions>(new UnmonitorCommand())
  }

  handler = (args: Arguments<RadarrOptions>): void => {
    throw new Error('Method not implemented.')
  }
}
