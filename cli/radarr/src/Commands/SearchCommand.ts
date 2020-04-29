import { Arguments } from 'yargs'
import { BaseCommand } from '@nativecode/media-cli'
import { RadarrClient, Movie } from '@nativecode/radarr'

import { Term } from '../Term'
import { TermType } from '../TermType'
import { toSearchTerm } from '../ToSearchTerm'
import { SearchOptions } from '../Options/SearchOptions'

export class SearchCommand extends BaseCommand<SearchOptions> {
  aliases = ['find', 'search']
  command = 'search <term>'

  builder = {}

  handler = async (args: Arguments<SearchOptions>) => {
    const radarr = new RadarrClient({ apikey: args.apikey, host: args.apiurl })
    const term = toSearchTerm(args.term)
    const results = await this.search(radarr, term)
    console.log(JSON.stringify(results))
  }

  async search(radarr: RadarrClient, term: Term): Promise<Movie[]> {
    switch (term.type) {
      case TermType.IMDB:
        return [await radarr.movie.imdb(term.value)]

      case TermType.TMDB:
        return [await radarr.movie.tmdb(parseInt(term.value, 0))]

      default:
        return radarr.movie.lookup(term.value)
    }
  }
}
