import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'
import { MovieInfo } from '../Models/MovieInfo'

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

  list(): Promise<Movie[]> {
    return this._get('movie')
  }

  remove(id: number, deleteFiles: boolean = false): Promise<void> {
    return this._delete('movie/{:id}', { deleteFiles }, [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
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
