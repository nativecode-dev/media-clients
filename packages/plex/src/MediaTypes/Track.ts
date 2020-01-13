import { Album } from './Album'
import { Artist } from './Artist'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Track: MediaTypeDefinition = {
  id: 10,
  element: 'audio',
  title: 'Track',
  typeString: 'track',
  related: [Artist, Album],
}
