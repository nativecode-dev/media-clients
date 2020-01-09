import yargs, { Arguments } from 'yargs'

import { ConfigureCommand, Global, GlobalOptions } from '@nativecode/media-cli'

import env from './env'
import log from './logging'

import ListCommand, { ListOptions } from './commands/list'
import ShowCommand, { ShowOptions } from './commands/show'
import EpisodesCommand, { EpisodeOptions } from './commands/episodes'
import CalendarCommand, { CalendarOptions } from './commands/calendar'

const args = GlobalOptions(yargs)
  .scriptName('sonarr-cli')
  .command('$0 <list|show>', false)
  .command<Global>(new ConfigureCommand())
  .command<CalendarOptions>(CalendarCommand)
  .command<ListOptions>(ListCommand)
  .command<EpisodeOptions>(EpisodesCommand)
  .command<ShowOptions>(ShowCommand)
  .middleware((args: Arguments<Global>) => {
    args = env(args)

    if (process.env.DEBUG) {
      console.log(args)
    }
  })
  .showHelpOnFail(true)
  .help()
  .parse()

log.trace(args)