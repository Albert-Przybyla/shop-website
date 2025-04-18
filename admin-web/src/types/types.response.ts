export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
}

export const mapProductResponse = (data: ProductResponse): ProductResponse => {
  return {
    ...data,
    price: formatPrice(data.price),
    discount: formatPrice(data.discount),
  };
};

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

export const mapProductDetailsResponse = (data: ProductDetailsResponse): ProductDetailsResponse => {
  return {
    ...data,
    price: formatPrice(data.price),
    discount: formatPrice(data.discount),
  };
};

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
  order_code: string;
  code?: CodeResponse;
  created_at: string;
  updated_at: string;
}

export const mapOrderResponse = (data: OrderResponse): OrderResponse => {
  return {
    ...data,
    total_price: formatPrice(data.total_price),
    delivery_method: {
      ...data.delivery_method,
      price: formatPrice(data.delivery_method.price),
    },
    products: data.products.map((product) => ({
      ...product,
      product: {
        ...product.product,
        price: formatPrice(product.product.price),
        discount: formatPrice(product.product.discount),
      },
    })),
  };
};

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

export const mapDeliveryMethodResponse = (data: DeliveryMethodResponse): DeliveryMethodResponse => {
  return {
    ...data,
    price: formatPrice(data.price),
  };
};

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

function formatPrice(priceInCents: number): number {
  return priceInCents / 100;
}
