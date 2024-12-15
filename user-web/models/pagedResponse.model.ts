export interface PagedResponse<T> {
  items: T[];
  total_page: number;
  current_page: number;
  total_items: number;
}
