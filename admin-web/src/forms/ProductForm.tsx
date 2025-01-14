import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProductModel, ProductSchema } from "@/schemas/ProductSchema";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ModalProps } from "@/types/base.types";
import { createProduct, updateProduct } from "@/api/product";

const ProductForm = ({ onClose, data, elementId }: ModalProps<ProductModel>) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ProductModel>({
    resolver: zodResolver(ProductSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: ProductModel) => {
    setLoading(true);
    const ans = elementId ? await updateProduct(elementId, values) : await createProduct(values);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazawa</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aditional_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis dodatkowy</FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materiał</FormLabel>
              <Textarea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
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

export default ProductForm;
