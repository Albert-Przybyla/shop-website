import { Card, CardButtons, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrder } from "@/api/order";
import { OrderResponse } from "@/types/types.response";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDialog } from "@/contexts/DialogContext";
import { Button } from "./ui/button";
import OrderStatusForm from "@/forms/OrderStatusForm";
import { Play, XCircle } from "lucide-react";
import OrderCancelationForm from "@/forms/OrderCancelationForm";

type Props = {
  id: string;
};

const OrderDetails = ({ id }: Props) => {
  const { showDialog } = useDialog();
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
          <CardButtons>
            {order?.status !== "unverified" && (
              <Button
                variant="outline"
                disabled={order?.status == "canceled" || order?.status == "unverified" || order?.status == "completed"}
                onClick={async () => {
                  const ans = await showDialog({
                    title: "Zaktualizuj status zamówienia",
                    content: OrderStatusForm,
                    elementId: id,
                    data: { status: order?.status },
                  });
                  if (ans) {
                    getData();
                  }
                }}
              >
                <Play /> Zaktualizuj status zamówienia
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={async () => {
                const ans = await showDialog({
                  title: "Adnuluj zamówienie",
                  content: OrderCancelationForm,
                  elementId: id,
                });
                if (ans) {
                  getData();
                }
              }}
              disabled={order?.status == "canceled"}
            >
              <XCircle /> Anuluj zamówienie
            </Button>
          </CardButtons>
        </CardHeader>
        <CardContent className="flex flex-row gap-6 flex-wrap">
          <div className="space-y-0.5">
            <small>ID</small>
            {order ? <h2 className="pt-1 ps-2 min-w-[130px]">{order.id}</h2> : <Skeleton className="h-8 w-[130px]" />}
          </div>
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
            <small>Wartosc Zamówienia</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">
                {order.total_price - (order.total_price * (order.code?.value || 0)) / 100} PLN
              </h2>
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
          <div className="space-y-0.5">
            <small>Wysylka</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">
                {order.delivery_method.name} {order.delivery_method.price} PLN
              </h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Dodatkowe informacje ({order?.delivery_method.additional_info_label || "Nie dotyczy"}) </small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{order.delivery_method_additional_info || "---"}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Notatki </small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px]">{order.note}</h2>
            ) : (
              <Skeleton className="h-8 w-[130px]" />
            )}
          </div>
          <div className="space-y-0.5">
            <small>Do zaplaty</small>
            {order ? (
              <h2 className="text-xl ps-2 min-w-[130px] underline ">
                <b>
                  {order.total_price -
                    (order.total_price * (order.code?.value || 0)) / 100 +
                    order.delivery_method.price}{" "}
                  PLN
                </b>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa Produktu</TableHead>
                  <TableHead>Cena jednostkowa</TableHead>
                  <TableHead>Znizka jednostkowa</TableHead>
                  <TableHead>Ilość</TableHead>
                  <TableHead>Rozmiar</TableHead>
                  <TableHead>Wartość</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.product.name}</TableCell>
                    <TableCell>{product.product.price} PLN</TableCell>
                    <TableCell>{(product.product.price * (order!.code?.value || 0)) / 100} PLN</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.size.label}</TableCell>
                    <TableCell className="font-bold">
                      {(product.product.price - (product.product.price * (order!.code?.value || 0)) / 100) *
                        product.quantity}{" "}
                      PLN
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
