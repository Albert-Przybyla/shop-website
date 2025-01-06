import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ModalProps } from "@/types/base.types";
import { DeliveryMethodModel, DeliveryMethodSchema } from "@/schemas/DeliveryMethodSchema";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { createDeliveryMethod, updateDeliveryMethod } from "@/api/deliveryMethod";

const DeliveryMethodForm = ({ onClose, data, elementId }: ModalProps<DeliveryMethodModel>) => {
  const form = useForm<DeliveryMethodModel>({
    resolver: zodResolver(DeliveryMethodSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: DeliveryMethodModel) => {
    const ans = elementId ? await updateDeliveryMethod(elementId, values) : await createDeliveryMethod(values);
    console.log(ans);
    onClose?.(true);
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa Metody dostawy</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena dostawy</FormLabel>
              <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aditional_info_label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa dodatkowego pola wymaganego</FormLabel>
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

export default DeliveryMethodForm;
