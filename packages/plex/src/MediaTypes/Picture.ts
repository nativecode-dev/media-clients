import { PhotoAlbum } from './PhotoAlbum'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Picture: MediaTypeDefinition = {
  id: 12,
  element: 'directory',
  title: 'Picture',
  typeString: 'picture',
  related: [PhotoAlbum],
}
