import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ModalProps } from "@/types/base.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { updateOrderStatus } from "@/api/order";
import { OrderCancelationModel, OrderCancelationSchema } from "@/schemas/OrderCancelationSchema";
import { useState } from "react";

const OrderCancelationForm = ({ onClose, elementId }: ModalProps<null>) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<OrderCancelationModel>({
    resolver: zodResolver(OrderCancelationSchema),
  });
  const onSubmit = async () => {
    setLoading(true);
    const ans = await updateOrderStatus(elementId!, { status: "canceled" });
    console.log(ans);
    onClose?.(true);
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czy na pewno chcesz anulować to zamówienie. Jeśli tak wpisz TAK poniżej ?</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button
            disabled={loading}
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
          <Button type="submit" className="flex-grow justify-center gap-2" disabled={loading}>
            <Save width={18} height={18} />
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrderCancelationForm;
