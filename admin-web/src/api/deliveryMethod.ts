import { ErrorResponse, PaginatedApiResponse } from "@/types/base.types";
import { DeliveryMethodResponse } from "@/types/types.response";
import { api } from "./api";
import { DeliveryMethodModel } from "@/schemas/DeliveryMethodSchema";

export const fetchDeliveryMethods = async (
  page_number: number,
  page_size: number
): Promise<PaginatedApiResponse<DeliveryMethodResponse> | ErrorResponse> => {
  try {
    const response = await api.get("/delivery-method", {
      params: {
        page_number,
        page_size,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch Sizes.");
    }
    return response.data as PaginatedApiResponse<DeliveryMethodResponse>;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const createDeliveryMethod = async (size: DeliveryMethodModel): Promise<any> => {
  try {
    const response = await api.post("/delivery-method", size);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const updateDeliveryMethod = async (id: string, size: DeliveryMethodModel): Promise<any> => {
  try {
    const response = await api.put(`/delivery-method/${id}`, size);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
