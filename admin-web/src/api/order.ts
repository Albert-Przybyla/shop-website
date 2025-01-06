import { ErrorResponse, PaginatedApiResponse } from "@/types/base.types";
import { api } from "./api";
import { OrderResponse } from "@/types/types.response";

export const fetchOrders = async (
  page_number: number,
  page_size: number
): Promise<PaginatedApiResponse<OrderResponse> | ErrorResponse> => {
  try {
    const response = await api.get("/order", {
      params: {
        page_number,
        page_size,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch Resellers.");
    }
    return response.data as PaginatedApiResponse<OrderResponse>;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const fetchOrder = async (order_id: string): Promise<OrderResponse | ErrorResponse> => {
  try {
    const response = await api.get(`/order/${order_id}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch Resellers.");
    }
    return response.data as OrderResponse;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const updateOrderStatus = async (order_id: string, status: { status: string }): Promise<any> => {
  try {
    const response = await api.patch(`/order/${order_id}/status`, status);
    if (response.status !== 200) {
      throw new Error("Failed to fetch Resellers.");
    }
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
