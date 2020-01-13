import { Album } from './Album'
import { Track } from './Track'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Artist: MediaTypeDefinition = {
  id: 8,
  element: 'directory',
  title: 'Artist',
  typeString: 'artist',
  related: [Album, Track],
}
