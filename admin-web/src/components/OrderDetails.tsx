import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrder } from "@/api/order";
import { OrderResponse } from "@/types/types.response";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
  id: string;
};

const OrderDetails = ({ id }: Props) => {
  const [order, setOrder] = useState<OrderResponse | undefined>();

  useEffect(() => {
    if (id) getData();
  }, [id]);

  const getData = async () => {
    const ans = await fetchOrder(id);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setOrder(ans);
  };
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Dane Zamówienia</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-4">
          <div className="space-y-0.5">
            <small>Email klienta</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{order.email}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Imie i nazwisko klienta</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">
                {order.first_name} {order.last_name}
              </h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Numer telefonu</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{order.phone}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Cena Zamówienia</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{order.total_price} PLN</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Adres dostawy</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">
                {order.address} {order.postal_code} {order.city} {order.country}
              </h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Produkty</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {order?.products.map((product) => (
              <div>{product.name}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
