import { Track } from './Track'
import { Artist } from './Artist'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Album: MediaTypeDefinition = {
  id: 9,
  element: 'directory',
  title: 'Album',
  typeString: 'album',
  related: [Artist, Track],
}
