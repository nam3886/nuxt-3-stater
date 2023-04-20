export type SortOption = 'ASC' | 'DESC';

type PaginationState = {
  limit?: number;
  page?: number;
};

type SortState = {
  sort_column?: string;
  sort_kind?: SortOption;
};

type SearchState = {
  q?: string;
};

type FilterState<T extends object> = T;

export type QueryState<T extends object> = PaginationState &
  SortState &
  FilterState<T> &
  SearchState;
