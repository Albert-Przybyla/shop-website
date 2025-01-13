import { PromoCodeModel } from "@/schemas/PromoCodeSchema";
import { api } from "./api";
import { CodeResponse } from "@/types/base.types";

export const validateCode = async (codeReq: PromoCodeModel): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.get(`/code/${codeReq.code}/verify`);
    return response.data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const fetchCode = async (code: string): Promise<CodeResponse> => {
  const response = await api.get(`/code/${code}`);
  return response.data;
};
