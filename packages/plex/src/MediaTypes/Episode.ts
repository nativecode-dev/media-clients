import { Show } from './Show'
import { Season } from './Season'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Episode: MediaTypeDefinition = {
  id: 4,
  element: 'video',
  title: 'Episode',
  typeString: 'episode',
  related: [Show, Season],
}
