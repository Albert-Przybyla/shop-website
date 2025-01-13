import { ErrorResponse, PaginatedApiResponse } from "@/types/base.types";
import {
  mapProductDetailsResponse,
  mapProductResponse,
  ProductDetailsResponse,
  ProductResponse,
} from "@/types/types.response";
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
      throw new Error("Failed to fetch products.");
    }
    return {
      ...response.data,
      items: response.data.items.map(mapProductResponse),
    } as PaginatedApiResponse<ProductResponse>;
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
      throw new Error("Failed to fetch product.");
    }
    return mapProductDetailsResponse(response.data as ProductDetailsResponse);
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

export const addProductPhoto = async (product_id: string, file: File, order: number): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await api.post(`/product/${product_id}/photo/${order}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (e: any) {
    return {
      error: e.response?.data?.error || e.message,
    };
  }
};

export const addSizeToProduct = async (product_id: string, size_id: string): Promise<any> => {
  try {
    const response = await api.patch(`/product/${product_id}/size/${size_id}`);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
