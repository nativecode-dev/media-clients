import { URL } from 'url'
import { Resource, ResourceRouteParamType } from '@nativecode/rest-client'

import { Movie } from '../Models/Movie'
import { AddMovie } from '../Models/AddMovie'

export class MovieResource extends Resource {
  constructor(url: URL, apikey: string) {
    super(url)
    this.setHeader('X-Api-Key', apikey)
  }

  add(movie: AddMovie): Promise<Movie> {
    return this.post<AddMovie, Movie>('movie', movie)
  }

  id(id: number): Promise<Movie> {
    return this.get<Movie>('movie/{:id}', [
      {
        key: 'id',
        type: ResourceRouteParamType.RouteParameter,
        value: id,
      },
    ])
  }

  list(): Promise<Movie[]> {
    return this.get<Movie[]>('movie')
  }

  remove(id: number): Promise<void> {
    return this.delete('movie/{:id}', id)
  }

  update(movie: Movie): Promise<Movie> {
    return this.put<Movie, Movie>('movie/{:id}', movie)
  }
}
