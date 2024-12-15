import { PagedResponse } from "@/models/pagedResponse.model";
import { api } from "./api";
import { Product } from "@/models/product.model";

export const fetchProducts = async (page: number = 1, pageSize: number = 10): Promise<PagedResponse<Product>> => {
  const response = await api.get(`/product?page=${page}&pageSize=${pageSize}`);
  console.log(response.data);
  return response.data;
};
