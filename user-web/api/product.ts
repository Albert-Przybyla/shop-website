import { PagedResponse } from "@/types/base.types";
import { api } from "./api";
import { mapProduct, Product } from "@/types/types.response";

export const fetchProducts = async (page: number = 1, pageSize: number = 10): Promise<PagedResponse<Product>> => {
  const response = await api.get(`/product`, {
    params: {
      page_number: page,
      page_size: pageSize,
      timestamp: new Date().getTime(),
    },
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  return {
    ...response.data,
    items: response.data.items.map(mapProduct),
  };
};

export const fetchProduct = async (productId: string): Promise<Product> => {
  const response = await api.get(`/product/${productId}`);
  return mapProduct(response.data);
};
