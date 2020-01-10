import { Is } from '@nofrills/types'

import chunk from 'chunk-text'

import { Series } from '@nativecode/sonarr'
import { Global, Output } from '@nativecode/media-cli'
import { Arguments, CommandModule, Options } from 'yargs'

import client from '../client'

import { ListPropertyFilter } from '../filters'

export interface ShowOptions extends Global {
  id: string
  overview: boolean
  property?: string
}

function getPropertyValue(args: ShowOptions, instance: any): any {
  if (args.property) {
    return instance[args.property]
  }

  return instance
}

function display(args: ShowOptions, show: Series): void {
  const property = getPropertyValue(args, show)

  if (Is.object(property)) {
    Output(args, property, 'show', args.compact, ListPropertyFilter)
  } else if (Is.array(property)) {
    Output(args, property, 'show', args.compact, ListPropertyFilter)
  } else if (Is.string(property)) {
    const chunks = chunk(property, process.stdout.columns - 30)
    Output(args, chunks, args.property!, args.compact || true, ListPropertyFilter)
  } else {
    Output(args, show, 'show', args.compact, ListPropertyFilter)
  }
}

const options: { [key: string]: Options } = {}

export class ShowCommand implements CommandModule<{}, ShowOptions> {
  aliases = ['series']
  command = 'show <id> [property]'
  builder = options
  handler = async (args: Arguments<ShowOptions>) => {
    const sonarr = client(args)
    const show = await sonarr.series.id(parseInt(args.id, 0))
    display(args, show)
  }
}

export default new ShowCommand()
