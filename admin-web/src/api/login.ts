import { LoginModel } from "@/schemas/LoginSchema";
import { api } from "./api";
import { TokenResponse } from "@/types/types.request";

export const login = async (req: LoginModel): Promise<TokenResponse> => {
  try {
    const response = await api.post("/login", req);
    if (response.status !== 200) {
      throw new Error("Login failed.");
    }
    return response.data as TokenResponse;
  } catch (e) {
    return e as TokenResponse;
  }
};
