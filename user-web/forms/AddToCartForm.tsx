"use client";
import Button from "@/components/Button";
import { AddToCartSchema, AddToCartModel } from "@/schemas/AddToCartSchema";
import { CartService } from "@/services/cartService";
import { Size } from "@/types/types.response";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  product_id: string;
  sizes: Size[];
};

const AddToCardForm = ({ product_id, sizes }: Props) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const notify = (t: string) => toast(t);
  const form = useForm<AddToCartModel>({
    resolver: zodResolver(AddToCartSchema),
    defaultValues: {
      product_id: product_id,
    },
  });
  const onSubmit = async (values: AddToCartModel) => {
    CartService.addItem(values);
    setCartItemCount(cartItemCount + values.quantity);
    notify(`Dodano produkt do koszyka`);
  };

  useEffect(() => {
    setCartItemCount(countCartItems());
    if (sizes && sizes.length === 1) {
      form.setValue("size_id", sizes[0].id);
    }
  }, [sizes]);

  const countCartItems = (): number => {
    let items = 0;
    CartService.getCart()
      .filter((item) => item.product_id === product_id)
      .forEach((item) => {
        items += item.quantity;
      });
    return items;
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="form-box">
        <label htmlFor="size">Wybierz rozmiar</label>
        <select id="size" {...form.register("size_id")}>
          <option value="">Wybierz rozmiar</option>
          {sizes.map((size) => {
            return (
              <option key={size.id} value={size.id}>
                {size.label}
              </option>
            );
          })}
        </select>
        <div className="errors">
          <p>{form.formState.errors.size_id?.message}</p>
        </div>
      </div>
      <div className="form-box">
        <label htmlFor="quantity">Ilość</label>
        <input
          id="quantity"
          {...(form.register("quantity"), { onChange: (e) => form.setValue("quantity", Number(e.target.value)) })}
          type="number"
          min={1}
        />
        <div className="errors">
          <p>{form.formState.errors.quantity?.message}</p>
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <Button type="submit">Dodaj do koszyka&nbsp;{cartItemCount > 0 && <span>({cartItemCount})</span>}</Button>
        <Link href="/cart" className="hover:underline">
          Zobacz koszyk
        </Link>
      </div>
    </form>
  );
};

export default AddToCardForm;
