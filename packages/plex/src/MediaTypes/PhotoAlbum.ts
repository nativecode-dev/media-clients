import { Photo } from './Photo'
import { Picture } from './Picture'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const PhotoAlbum: MediaTypeDefinition = {
  id: 11,
  element: 'directory',
  title: 'Photo Album',
  typeString: 'photoAlbum',
  related: [Picture, Photo],
}
