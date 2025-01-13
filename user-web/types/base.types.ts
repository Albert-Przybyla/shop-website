export interface PagedResponse<T> {
  items: T[];
  total_page: number;
  current_page: number;
  total_items: number;
}

export interface CreateResponse {
  id: string;
}

export interface ErrorResponse {
  error: string;
}

export enum Status {
  Unverified = "unverified",
  Verified = "verified",
  Confirmed = "confirmed",
  Shipped = "shipped",
  Completed = "completed",
  Cancelled = "cancelled",
}

export interface CodeResponse {
  code: string;
  value: number;
}
