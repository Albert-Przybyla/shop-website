import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CodeModel, CodeSchema } from "@/schemas/codeSchema";
import { ModalProps } from "@/types/base.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Save, X } from "lucide-react";
import { createCode, isCodeExists } from "@/api/code";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { pl } from "date-fns/locale";

const CodeForm = ({ onClose, data }: ModalProps<CodeModel>) => {
  const [loading, setLoading] = useState(false);
  const [isCodeChecked, setIsCodeChecked] = useState(false);
  const [isCodeExisting, setIsCodeExisting] = useState(false);

  const EnhancedSchema = CodeSchema.refine(() => isCodeChecked && !isCodeExisting, {
    message: "Kod musi zostać sprawdzony, a jego dostępność potwierdzona.",
    path: ["code"],
  });

  const form = useForm<CodeModel>({
    resolver: zodResolver(EnhancedSchema),
    defaultValues: data || {},
  });
  const onSubmit = async (values: CodeModel) => {
    setLoading(true);
    const ans = createCode(values);
    console.log(ans);
    onClose?.(true);
    setLoading(false);
  };

  const checkIsCodeExist = async () => {
    const code = form.getValues("code");
    if (!code) {
      form.setError("code", { message: "Proszę wpisać kod przed sprawdzeniem." });
      return;
    }
    if (code.length < 6) {
      form.setError("code", { message: "Kod musi być dłuższy niż 6 znaków." });
      return;
    }
    if (code.length > 20) {
      form.setError("code", { message: "Kod nie może być dłuższy niż 20 znaków." });
      return;
    }
    if (code.match(/[^A-Za-z0-9_-]/)) {
      form.setError("code", { message: "Kod może zawierać tylko litery, cyfry, myślniki i podkreślenia." });
      return;
    }

    const ans = await isCodeExists(code);
    setIsCodeChecked(true);
    setIsCodeExisting(ans.exists);

    if (ans.exists) {
      form.setError("code", { message: "Kod już istnieje." });
    } else {
      form.clearErrors("code");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kod promocyjny</FormLabel>
              <div className="flex flex-row gap-2">
                <Input {...field} className="flex-grow" />
                <Button type="button" onClick={checkIsCodeExist}>
                  Sprawdź dostępnośc
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wartośc Kodu [%]</FormLabel>
              <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_uses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ilośc kodów</FormLabel>
              <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data wygasniecia (opcjonalne)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal border border-input bg-transparent px-3 py-1 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "dd MMM yyyy", { locale: pl }) : <span>Wybierz date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  <Button type="button" onClick={() => field.onChange(null)} className="w-full" variant="destructive">
                    Wyczysć pole
                  </Button>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis (opcjonalne)</FormLabel>
              <Textarea {...field} />
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

export default CodeForm;
