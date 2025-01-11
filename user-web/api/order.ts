import { OrderModel } from "@/schemas/OrderFormSchema";
import { api } from "./api";
import { CreateResponse, ErrorResponse } from "@/types/base.types";
import { VeryficationModel } from "@/schemas/VeryficationSchema";

export const createOrder = async (order: OrderModel): Promise<CreateResponse | ErrorResponse> => {
  try {
    const response = await api.post(`/order`, order);
    if (response.status !== 200) {
      return {
        error: "Something went wrong",
      };
    }
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};

export const verifyOrder = async (orderId: string, code: VeryficationModel): Promise<any> => {
  try {
    const response = await api.patch(`/order/${orderId}/verify`, code);
    if (response.status !== 200) {
      return {
        error: "Something went wrong",
      };
    }
    return response.data;
  } catch (e: any) {
    console.log(e);
    return {
      error: e.response.data.error,
    };
  }
};

export const orderStatus = async (orderId: string): Promise<any> => {
  try {
    const response = await api.get(`/order/${orderId}/status`);
    if (response.status !== 200) {
      return {
        error: "Something went wrong",
      };
    }
    return response.data;
  } catch (e: any) {
    return {
      error: e.message,
    };
  }
};
