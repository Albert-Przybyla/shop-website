import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SizeModel, SizeSchema } from "@/schemas/SizeSchema";
import { ModalProps } from "@/types/base.types";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { createSize, updateSize } from "@/api/size";

const SizeForm = ({ onClose, data, elementId }: ModalProps<SizeModel>) => {
  const form = useForm<SizeModel>({
    resolver: zodResolver(SizeSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: SizeModel) => {
    const ans = elementId ? await updateSize(elementId, values) : await createSize(values);
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nazwa rozmiaru</FormLabel>
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

export default SizeForm;
