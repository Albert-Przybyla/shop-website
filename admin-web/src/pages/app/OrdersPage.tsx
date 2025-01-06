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
    const ans = await fetchOrders(page.current_page, 10);
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
          <div>
            {page.current_page > 1 && (
              <button
                className="m-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setPage(new PaginationData(page.current_page - 1, page.total_items, page.total_pages))}
              >
                Poprzednia
              </button>
            )}
            {page.current_page} / {page.total_pages}
            {page.current_page < page.total_pages && (
              <button
                className="m-2 rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => setPage(new PaginationData(page.current_page + 1, page.total_items, page.total_pages))}
              >
                Następna
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
