export interface Product {
  id: string;
  name: string;
  description: string;
  aditional_description: string;
  material: string;
  price: number;
  discount: number;
  photos: Photo[];
  sizes: Size[];
}

export const mapProduct = (product: Product) => {
  return {
    ...product,
    price: product.price / 100,
  };
};

export interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  additional_info_label: string;
}

export const mapDeliveryMethod = (deliveryMethod: DeliveryMethod) => {
  return {
    ...deliveryMethod,
    price: deliveryMethod.price / 100,
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

export interface Size {
  id: string;
  label: string;
  created_at: string;
  updated_at: string;
}
