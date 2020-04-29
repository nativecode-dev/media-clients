import { Term } from './Term'
import { TermType } from './TermType'

function isImdbId(term: string): boolean {
  return /^(tt\d{7,8})$/i.test(term)
}

function isTmdbId(term: string): boolean {
  return /^([1-9]\d*)$/i.test(term)
}

export function toSearchTerm(term: string): Term {
  if (isImdbId(term)) {
    return { type: TermType.IMDB, value: term }
  }

  if (isTmdbId(term)) {
    return { type: TermType.TMDB, value: term }
  }

  return { type: TermType.String, value: term }
}
