import { PhotoAlbum } from './PhotoAlbum'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Photo: MediaTypeDefinition = {
  id: 13,
  element: 'photo',
  title: 'Photo',
  typeString: 'photo',
  related: [PhotoAlbum],
}
