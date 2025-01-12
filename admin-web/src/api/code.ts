import { PaginatedApiResponse } from "@/types/base.types";
import { api } from "./api";
import { CodeResponse } from "@/types/types.response";
import { CodeModel } from "@/schemas/codeSchema";

export const fetchCodes = async (page_number: number, page_size: number): Promise<any> => {
  try {
    const response = await api.get("/code", {
      params: {
        page_number: page_number,
        page_size: page_size,
      },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch Sizes.");
    }
    return response.data as PaginatedApiResponse<CodeResponse>;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const createCode = async (code: CodeModel): Promise<any> => {
  try {
    const response = await api.post("/code", code);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const isCodeExists = async (code: string): Promise<{ exists: boolean }> => {
  try {
    const response = await api.get(`/code/${code}/exists`);
    return response.data;
  } catch {
    return {
      exists: true,
    };
  }
};

export const toggleActiveCode = async (code: string): Promise<{ message: string }> => {
  try {
    const response = await api.patch(`/code/${code}/toggle`);
    return response.data;
  } catch (e: any) {
    return {
      message: e.response.data.error,
    };
  }
};
