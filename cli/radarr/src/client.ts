import { Global, IsImdbId } from '@nativecode/media-cli'
import { RadarrClient, Movie } from '@nativecode/radarr'

export function GetMovieById(client: RadarrClient, id: string): Promise<Movie> {
  if (IsImdbId(id)) {
    return client.movie.imdb(id)
  }
  return client.movie.id(parseInt(id, 0))
}

export default function (args: Global): RadarrClient {
  return new RadarrClient({ apikey: args.apikey, host: args.endpoint })
}
