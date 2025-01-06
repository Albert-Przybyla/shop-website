import { AdminResponse } from "@/types/types.response";

import { api } from "./api";
import { AdminModel } from "@/schemas/AdminSchema";
import { ErrorResponse } from "@/types/base.types";

export const fetchADmins = async (): Promise<AdminResponse[] | ErrorResponse> => {
  try {
    const response = await api.get("/admin");

    if (response.status !== 200) {
      throw new Error("Failed to fetch Sizes.");
    }
    return response.data as AdminResponse[];
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const createAdmin = async (size: AdminModel): Promise<any> => {
  try {
    const response = await api.post("/admin", size);
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
