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
  aditional_description: string;
  material: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  photos: Photo[];
  sizes: SizeResponse[];
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
  delivery_method: DeliveryMethodResponse;
  delivery_method_additional_info: string;
  note: string;
  products: OrderProductResponse[];
  created_at: string;
  updated_at: string;
}

export interface SizeResponse {
  id: string;
  label: string;
  created_at: string;
  updated_at: string;
}

export interface AdminResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface DeliveryMethodResponse {
  id: string;
  name: string;
  price: number;
  additional_info_label?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderProductResponse {
  order_id: string;
  product_id: string;
  quantity: number;
  size_id: string;
  size: SizeResponse;
  product: ProductResponse;
}

export interface CodeResponse {
  code: string;
  value: number;
  max_uses: number;
  uses: number;
  description: string;
  is_active: boolean;
  expiration: string;
  show_on_page: boolean;
  updated_at: string;
  created_at: string;
}
