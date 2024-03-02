export interface UserApiSortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface UserApiPageInfo {
  offset: number;
  pageNumber: number;
  pageSize: number;
}
