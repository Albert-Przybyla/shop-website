import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModalProps } from "@/types/base.types";
import { AddSizeToProductModel, AddSizeToProductSchema } from "@/schemas/AddSizeToProductSchema";
import { addSizeToProduct } from "@/api/product";
import { SizeResponse } from "@/types/types.response";
import { fetchSizes } from "@/api/size";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AddSizeToProductForm = ({ onClose, data, elementId }: ModalProps<AddSizeToProductModel>) => {
  const [sizes, setSizes] = useState<SizeResponse[]>([]);
  const form = useForm<AddSizeToProductModel>({
    resolver: zodResolver(AddSizeToProductSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: AddSizeToProductModel) => {
    const ans = await addSizeToProduct(elementId!, values.size);
    console.log(ans);
    onClose?.(true);
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ans = await fetchSizes(1, 100);
    if ("error" in ans) {
      console.log(ans.error);
      return;
    }
    setSizes(ans.items);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa rozmiaru</FormLabel>
              <div className="flex flex-row gap-2">
                {sizes.map((size: SizeResponse) => (
                  <Badge
                    key={size.id}
                    className={cn("flex flex-row gap-2 cursor-pointer")}
                    variant={field.value === size.id ? "default" : "secondary"}
                    onClick={() => field.onChange(size.id)}
                  >
                    <p>{size.label}</p>
                  </Badge>
                ))}
              </div>
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

export default AddSizeToProductForm;
