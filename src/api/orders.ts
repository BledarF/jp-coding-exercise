import { MOCK_ORDERS } from "../testUtils/mockOrders";
import type { Order } from "../types/order";

export const fetchMockOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_ORDERS), 500);
  });
};
