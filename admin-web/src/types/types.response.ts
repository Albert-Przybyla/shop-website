export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

export interface ProductDetailsResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  product_id: string;
  url: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface OrderResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  total_price: number;
  phone: string;
  confirmation_code: string;
  status: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  products: any;
  created_at: string;
  updated_at: string;
}
