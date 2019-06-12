import { SelectOption } from './SelectOption'

export interface IndexerField {
  order: number
  name: string
  label: string
  value: any
  type: string
  advanced: boolean
  helpText: string
  selectOptions: SelectOption[]
  helpLink: string
}
