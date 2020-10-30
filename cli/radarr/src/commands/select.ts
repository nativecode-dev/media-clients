import yargsui from 'yargs-interactive'

import { RadarrClient, Movie } from '@nativecode/radarr'
import { CommandModule, Arguments, Argv } from 'yargs'

import { Global, Output } from '@nativecode/media-cli'
import { ListPropertyFilter } from '../filters'

export interface SelectOptions extends Global {
  shows?: string
  season?: string
}

function selectMovie(movies: Movie[]) {
  return yargsui().interactive({
    interactive: {
      default: true,
    },
    movie: {
      choices: movies.map((movie) => movie.title),
      describe: 'select movie',
      prompt: 'always',
      type: 'list',
    },
  })
}

function selectProperties(movie: Movie) {
  return yargsui().interactive({
    interactive: {
      default: true,
    },
    properties: {
      choices: Object.keys(movie),
      default: Object.keys(movie),
      describe: 'select properties',
      prompt: 'always',
      type: 'checkbox',
    },
  })
}

export class SelectCommand implements CommandModule<{}, SelectOptions> {
  command = 'select'
  describe = 'view info for movie'
  handler = async (args: Arguments<SelectOptions>) => {
    const radarr = new RadarrClient({ apikey: args.apikey, host: args.endpoint })
    const movies = await radarr.movie.list()

    const selectedMovieAnswer = await selectMovie(movies)
    const selectedMovie = movies.find((movie) => movie.title === selectedMovieAnswer.movie)

    if (selectedMovie) {
      const movie = await radarr.movie.id(selectedMovie.id)

      if (args.output === 'pretty') {
        const selectedPropertiesAnswer = await selectProperties(movie)
        const filter = (property: string) => selectedPropertiesAnswer.properties.includes(property)
        Output(args, movie, 'movie', args.compact, filter)
      } else {
        Output(args, movie, 'movie', args.compact, ListPropertyFilter)
      }
    }
  }
}

export default new SelectCommand()
