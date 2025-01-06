import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ModalProps } from "@/types/base.types";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { OrderStatusModel, OrderStatusSchema } from "@/schemas/OrderStatusSchema";
import { updateOrderStatus } from "@/api/order";
const getNewStatus = (status: string) => {
  switch (status) {
    case "verified":
      return "paid";
    case "paid":
      return "shipped";
    case "shipped":
      return "completed";
    default:
      return "completed";
  }
};

const OrderStatusForm = ({ onClose, data, elementId }: ModalProps<OrderStatusModel & { status: string }>) => {
  const form = useForm<OrderStatusModel>({
    resolver: zodResolver(OrderStatusSchema),
    defaultValues: {
      status: getNewStatus(data!.status!),
    },
  });
  const onSubmit = async (values: OrderStatusModel) => {
    const ans = await updateOrderStatus(elementId!, values);
    console.log(ans);
    onClose?.(true);
  };

  useEffect(() => {
    if (data) {
      form.reset({ status: getNewStatus(data!.status!) });
    }
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nowy Status</FormLabel>
              <Input {...field} disabled />
              <FormMessage />
            </FormItem>
          )}
        />
        {getNewStatus(data!.status!) === "shipped" && (
          <FormField
            control={form.control}
            name="tracking_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres do śledzenia przesyłki</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Czy na pewno chcesz zaktualizowac status zamówienia na {getNewStatus(data!.status!)}. Jeśli tak wpisz
                TAK poniżej ?
              </FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button
            type="reset"
            variant="secondary"
            className="flex-grow justify-center gap-2"
            onClick={() => {
              onClose?.(false);
            }}
          >
            <X width={18} height={18} />
            Anuluj
          </Button>
          <Button type="submit" className="flex-grow justify-center gap-2">
            <Save width={18} height={18} />
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderStatusForm;
