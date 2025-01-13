import { PagedResponse } from "@/types/base.types";
import { DeliveryMethod, mapDeliveryMethod } from "@/types/types.response";
import { api } from "./api";

export const fetchDeliveryMethods = async (
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<DeliveryMethod>> => {
  const response = await api.get(`/delivery-method?page_number=${page}&page_size=${pageSize}`);
  return {
    ...response.data,
    items: response.data.items.map(mapDeliveryMethod),
  };
};
