import { Show } from './Show'
import { Episode } from './Episode'
import { MediaTypeDefinition } from './MediaTypeDefinition'

export const Season: MediaTypeDefinition = {
  id: 3,
  element: 'directory',
  title: 'Season',
  typeString: 'season',
  related: [Show, Episode],
}
