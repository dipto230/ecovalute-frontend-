
import CustomerOrdersClient from "@/src/app/components/modules/Customer/CustomerOrdersClient";
import { getMyOrders } from "@/src/services/order.service";
import type { IOrder } from "@/src/types/order.types";


export default async function CustomerOrdersPage() {
  let orders: IOrder[] = [];
  let errorMessage = "";

  try {
    const response = await getMyOrders({
      page: 1,
      limit: 100,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    const result = response.data as unknown;

    if (Array.isArray(result)) {
      orders = result as IOrder[];
    } else if (
      result &&
      typeof result === "object" &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      orders = result.data as IOrder[];
    } else {
      errorMessage = "The orders response format was unexpected.";
    }
  } catch (error) {
    console.error("Failed to load customer orders:", error);
    errorMessage =
      "Could not load your orders. Please check your login session and API connection.";
  }

  return (
    <CustomerOrdersClient
      initialOrders={orders}
      errorMessage={errorMessage}
    />
  );
}
