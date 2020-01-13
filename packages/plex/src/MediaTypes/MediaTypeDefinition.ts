export interface MediaTypeDefinition {
  id: number
  typeString: string
  title: string
  element: string
  related?: MediaTypeDefinition[]
}
