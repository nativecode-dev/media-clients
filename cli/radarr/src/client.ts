import { URL } from 'url'
import { RadarrClient, Movie, RemoteMovie } from '@nativecode/radarr'

import logger from './logging'

import { Global, IsImdbId } from '@nativecode/media-cli'

export function GetMovieById(client: RadarrClient, id: string): Promise<Movie | RemoteMovie> {
  if (IsImdbId(id)) {
    return client.movie.imdb(id)
  }
  return client.movie.id(parseInt(id, 0))
}

export default function(args: Global): RadarrClient {
  const url = new URL(args.endpoint)
  return new RadarrClient(url, args.apikey, logger)
}
