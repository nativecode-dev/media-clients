import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'
import { MovieInfo } from '../Models/MovieInfo'
import { RemoteMovie } from '../Models/RemoteMovie'

export class MovieResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  add(movie: MovieInfo): Promise<Movie> {
    return this._post('movie', movie)
  }

  id(id: number): Promise<Movie> {
    return this._get('movie/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  imdb(imdbId: string): Promise<RemoteMovie> {
    return this._get('movie/lookup/imdb', [
      {
        key: 'imdbId',
        type: ResourceRouteParamType.Query,
        value: imdbId,
      },
    ])
  }

  list(): Promise<Movie[]> {
    return this._get('movie')
  }

  lookup(term: string): Promise<RemoteMovie[]> {
    return this._get('movie/lookup', [
      {
        key: 'term',
        type: ResourceRouteParamType.Query,
        value: term,
      },
    ])
  }

  remove(id: number, deleteFiles: boolean = false): Promise<void> {
    return this._delete('movie/{:id}', [
      {
        key: 'deleteFiles',
        type: ResourceRouteParamType.Query,
        value: deleteFiles,
      },
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  tmdb(tmdbId: number): Promise<RemoteMovie> {
    return this._get('movie/lookup/tmdb', [
      {
        key: 'tmdbId',
        type: ResourceRouteParamType.Query,
        value: tmdbId,
      },
    ])
  }

  update(movie: Movie): Promise<Movie> {
    return this._put('movie/{:id}', movie, [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: movie.id,
      },
    ])
  }
}
