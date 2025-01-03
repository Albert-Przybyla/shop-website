import { fetchOrders } from "@/api/order";
import { PaginationData } from "@/types/base.types";
import { OrderResponse } from "@/types/types.response";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import OrderDetails from "@/components/OrderDetails";
import { Badge } from "@/components/ui/badge";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [page, setPage] = useState<PaginationData>(new PaginationData());

  useEffect(() => {
    getData();
  }, [page.current_page]);

  const getData = async () => {
    const ans = await fetchOrders(1, 10);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setOrders(ans.items);
    setPage(new PaginationData(ans.current_page, ans.total_items, ans.total_pages));
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Zamówienia</CardTitle>
          <CardDescription>Lista zamówien</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            {orders.map((order) => (
              <AccordionItem key={order.id} value={`item-${order.id}`}>
                <AccordionTrigger>
                  <p>
                    {order.email} - {new Date(order.created_at).toLocaleDateString("pl-PL")}{" "}
                    <Badge className="mx-2">{order.status}</Badge>
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <OrderDetails id={order.id} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
