export interface Paging<T> {
  page: number
  pageSize: number
  sortKey: string
  sortDirection: string
  totalRecords: number
  records: T[]
}
