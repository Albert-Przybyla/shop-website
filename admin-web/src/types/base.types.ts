export interface PaginatedApiResponse<T> {
  items: T[];
  current_page: number;
  total_items: number;
  total_pages: number;
}

export class PaginationData {
  current_page: number;
  total_items: number;
  total_pages: number;

  constructor(current_page: number = 1, total_items: number = 0, total_pages: number = 0) {
    this.current_page = current_page;
    this.total_items = total_items;
    this.total_pages = total_pages;
  }
}

export interface Currency {
  code: string;
  name: string;
  flag: string;
}

export interface ErrorResponse {
  error: string;
}

export interface ModalProps<T> {
  onClose: (v: unknown) => void;
  data?: T;
  elementId?: string;
}
