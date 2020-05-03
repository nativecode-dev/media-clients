import yargs from 'yargs'

import { RadarrOptions } from './Options/RadarrOptions'
import { DefaultCommand } from './Commands/DefaultCommand'

yargs
  .scriptName('radarr')
  .command<RadarrOptions>(new DefaultCommand())
  .option('dryrun', { default: false, type: 'boolean' })
  .config({ apikey: process.env.RADARR_APIKEY || '', apiurl: process.env.RADARR_APIURL || '' })
  .parse()
