import { ErrorResponse, PaginatedApiResponse } from "@/types/base.types";
import { ProductDetailsResponse, ProductResponse } from "@/types/types.response";
import { api } from "./api";
import { ProductModel } from "@/schemas/ProductSchema";
import { ProductDiscountModel } from "@/schemas/ProductDiscountSchema";

export const fetchProducts = async (
  page_number: number,
  page_size: number
): Promise<PaginatedApiResponse<ProductResponse> | ErrorResponse> => {
  try {
    const response = await api.get("/product", {
      params: {
        page_number,
        page_size,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch Resellers.");
    }
    return response.data as PaginatedApiResponse<ProductResponse>;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const fetchProduct = async (product_id: string): Promise<ProductDetailsResponse | ErrorResponse> => {
  try {
    const response = await api.get(`/product/${product_id}`);

    if (response.status !== 200) {
      throw new Error("Failed to fetch Resellers.");
    }
    return response.data as ProductDetailsResponse;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const createProduct = async (product: ProductModel): Promise<any> => {
  try {
    const response = await api.post("/product", product);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const updateProduct = async (product_id: string, product: ProductModel): Promise<any> => {
  try {
    const response = await api.put(`/product/${product_id}`, product);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const setDiscount = async (product_id: string, discount: ProductDiscountModel): Promise<any> => {
  try {
    const response = await api.patch(`/product/${product_id}/discount`, discount);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const addProductPhoto = async (
  product_id: string,
  file: File,
  fileName: string,
  order: number
): Promise<any> => {
  try {
    const response = await api.post(
      `/product/${product_id}/photo/${order}`,
      { file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "file-name": fileName,
        },
      }
    );

    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
