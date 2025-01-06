import { PagedResponse } from "@/types/base.types";
import { api } from "./api";
import { Product } from "@/types/types.response";

export const fetchProducts = async (page: number = 1, pageSize: number = 10): Promise<PagedResponse<Product>> => {
  const response = await api.get(`/product?page_number=${page}&page_size=${pageSize}`);
  return response.data;
};

export const fetchProduct = async (productId: string): Promise<Product> => {
  const response = await api.get(`/product/${productId}`);
  return response.data;
};
