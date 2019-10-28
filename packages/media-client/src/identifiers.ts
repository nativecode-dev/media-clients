const PATTERN_IMDBID = /(tt\d+)/g

export function IsImdbId(value: string): boolean {
  return PATTERN_IMDBID.test(value)
}

export function ExtractImdbIds(value: string): string[] {
  const matches = PATTERN_IMDBID.exec(value)

  if (matches && matches.length) {
    matches.map(match => console.log(match))
  }

  return []
}
