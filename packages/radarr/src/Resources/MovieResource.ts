import { URL } from 'url'
import { Lincoln } from '@nofrills/lincoln'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'
import { AddMovie } from '../Models/AddMovie'

export class MovieResource extends Resource {
  constructor(url: URL, apikey: string, logger: Lincoln) {
    super(url, logger)
    this.setHeader('X-Api-Key', apikey)
  }

  add(movie: AddMovie): Promise<Movie> {
    return this.post('movie', movie)
  }

  id(id: number): Promise<Movie> {
    return this.get('movie/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  list(): Promise<Movie[]> {
    return this.get('movie')
  }

  remove(id: number): Promise<void> {
    return this.delete('movie/{:id}', id)
  }

  update(movie: Movie): Promise<Movie> {
    return this.put('movie/{:id}', movie)
  }
}
