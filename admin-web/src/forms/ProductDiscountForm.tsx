import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { ModalProps } from "@/types/base.types";
import { setDiscount } from "@/api/product";
import { ProductDiscountModel, ProductDiscountSchema } from "@/schemas/ProductDiscountSchema";

const ProductDiscountForm = ({ onClose, data, elementId }: ModalProps<ProductDiscountModel & { price: number }>) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ProductDiscountModel>({
    resolver: zodResolver(ProductDiscountSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: ProductDiscountModel) => {
    setLoading(true);
    const ans = await setDiscount(elementId!, values);
    console.log(ans);
    onClose?.(true);
    setLoading(false);
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
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zniżka</FormLabel>
              <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2">
          <Button
            type="reset"
            disabled={loading}
            variant="secondary"
            className="flex-grow justify-center gap-2"
            onClick={() => {
              onClose?.(false);
            }}
          >
            <X width={18} height={18} />
            Anuluj
          </Button>
          <Button type="submit" disabled={loading} className="flex-grow justify-center gap-2">
            <Save width={18} height={18} />
            Zapisz
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductDiscountForm;
