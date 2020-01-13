import { Season } from './Season'
import { Episode } from './Episode'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Show: MediaTypeDefinition = {
  id: 2,
  element: 'directory',
  title: 'Show',
  typeString: 'show',
  related: [Season, Episode],
}
