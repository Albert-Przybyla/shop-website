import { ErrorResponse, PaginatedApiResponse } from "@/types/base.types";
import { SizeResponse } from "@/types/types.response";
import { api } from "./api";
import { SizeModel } from "@/schemas/SizeSchema";

export const fetchSizes = async (
  page_number: number,
  page_size: number
): Promise<PaginatedApiResponse<SizeResponse> | ErrorResponse> => {
  try {
    const response = await api.get("/size", {
      params: {
        page_number,
        page_size,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch Sizes.");
    }
    return response.data as PaginatedApiResponse<SizeResponse>;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const createSize = async (size: SizeModel): Promise<any> => {
  try {
    const response = await api.post("/size", size);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const updateSize = async (size_id: string, size: SizeModel): Promise<any> => {
  try {
    const response = await api.put(`/size/${size_id}`, size);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
