"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { fetchProduct } from "@/api/product";
import Loader from "@/components/Loader";
import { CartService } from "@/services/cartService";
import { DeliveryMethod, Product } from "@/types/types.response";
import React, { useEffect, useState } from "react";
import { OrderModel, OrderSchema } from "@/schemas/OrderFormSchema";
import { fetchDeliveryMethods } from "@/api/deliveryMethod";
import Button from "@/components/Button";
import { createOrder } from "@/api/order";
import { toast } from "react-toastify";
import { PromoCodeModel, PromoCodeSchema } from "@/schemas/PromoCodeSchema";
import { fetchCode, validateCode } from "@/api/code";
import { CodeResponse } from "@/types/base.types";
import { p } from "framer-motion/m";
import { PriceDisplay } from "@/components/utils";

type CartItem = {
  product_id: string;
  quantity: number;
  size_id: string;
  product: Product;
};

const Page = () => {
  const notify = (t: string) => toast(t);
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [code, setCode] = React.useState<CodeResponse | null>(null);
  const [deliveryMethods, setDeliveryMethods] = React.useState<DeliveryMethod[]>([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = React.useState<DeliveryMethod | null>(null);
  const [loading, setLoading] = React.useState(true);

  const form = useForm<OrderModel>({
    resolver: zodResolver(OrderSchema),
  });

  const [codeError, setCodeError] = useState<string | null>(null);

  const promoCodeform = useForm<PromoCodeModel>({
    resolver: zodResolver(PromoCodeSchema),
  });

  const checkCode = async (values: PromoCodeModel) => {
    setLoading(true);
    CartService.removePromoCode();
    const validationResponse = await validateCode(values);
    if (validationResponse.success) {
      notify(validationResponse.message + " Kod został zapisany.");
      setCodeError(null);
      CartService.savePromoCode(values.code);
      await getCode(values.code);
      setLoading(false);
    } else {
      notify(validationResponse.message);
      setCodeError(validationResponse.message);
      setLoading(false);
    }
  };

  const onSubmit = async (values: OrderModel) => {
    setLoading(true);
    const code = CartService.getPromoCode();
    const order = await createOrder(values, code);
    if ("error" in order) {
      notify(order.error);
    } else if ("id" in order) {
      CartService.clearCart();
      CartService.removePromoCode();
      notify("Zamówienie zostało złożone!");
      window.location.href = "/checkout/" + order.id;
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getCode = async (code: string): Promise<void> => {
    try {
      const code_res = await fetchCode(code);
      setCode(code_res);
    } catch (e: any) {
      notify("Coś poszło nie tak!");
    }
  };

  const calcOrderValue = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getData = async () => {
    setLoading(true);
    const promoCode = CartService.getPromoCode();
    if (promoCode) {
      promoCodeform.setValue("code", promoCode);
      await getCode(promoCode);
    }
    const cartFromCookie = CartService.getCart();
    if (cartFromCookie.length === 0) {
      window.location.href = "/";
    }
    const new_cart: CartItem[] = [];
    for (const item of cartFromCookie) {
      const res = await fetchProduct(item.product_id);
      new_cart.push({
        product_id: item.product_id,
        quantity: item.quantity,
        size_id: item.size_id,
        product: res,
      });
    }
    const deliveryMethods = await fetchDeliveryMethods();
    setDeliveryMethods(deliveryMethods.items);
    form.setValue(
      "products",
      new_cart.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
          size_id: item.size_id,
        };
      })
    );
    setCart(new_cart);
    setLoading(false);
  };
  return (
    <>
      <div className="container mx-auto mt-[100px] mb-[200px] space-y-12 ">
        <h1 className="text-3xl font-bold px-3 text-center">Zamówienie</h1>
        <div className="flex flex-col-reverse px-3 xl:flex-row gap-6 relative">
          <div className="xl:w-2/3 space-y-6 px-6">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h3 className="text-3xl font-bold mb-3">Dane odbiorcy</h3>
              <div className="form-box">
                <label htmlFor="email">Adres Email</label>
                <input id="email" {...form.register("email")} type="email" />
                <div className="errors">
                  <p>{form.formState.errors.email?.message}</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-wrap gap-6">
                <div className="form-box flex-grow-0">
                  <label htmlFor="first_name">Imię</label>
                  <input id="first_name" {...form.register("first_name")} type="first_name" className="w-full" />
                  <div className="errors">
                    <p>{form.formState.errors.first_name?.message}</p>
                  </div>
                </div>
                <div className="form-box flex-grow-0">
                  <label htmlFor="last_name">Nazwisko</label>
                  <input id="last_name" {...form.register("last_name")} type="last_name" />
                  <div className="errors">
                    <p>{form.formState.errors.last_name?.message}</p>
                  </div>
                </div>
                <div className="form-box flex-grow-0">
                  <label htmlFor="phone">Numer telefonu</label>
                  <input id="phone" {...form.register("phone")} type="phone" />
                  <div className="errors">
                    <p>{form.formState.errors.phone?.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row flex-wrap gap-6">
                <div className="form-box flex-grow-0">
                  <label htmlFor="street">Adres</label>
                  <input id="street" {...form.register("address")} type="address" />
                  <div className="errors">
                    <p>{form.formState.errors.address?.message}</p>
                  </div>
                </div>
                <div className="form-box flex-grow-0">
                  <label htmlFor="city">Miasto</label>
                  <input id="city" {...form.register("city")} type="city" />
                  <div className="errors">
                    <p>{form.formState.errors.city?.message}</p>
                  </div>
                </div>
                <div className="form-box flex-grow-0">
                  <label htmlFor="postal_code">Kod pocztowy</label>
                  <input id="postal_code" {...form.register("postal_code")} type="postal_code" />
                  <div className="errors">
                    <p>{form.formState.errors.postal_code?.message}</p>
                  </div>
                </div>
                <div className="form-box flex-grow-0">
                  <label htmlFor="country">Kraj</label>
                  <input id="country" {...form.register("country")} type="country" />
                  <div className="errors">
                    <p>{form.formState.errors.country?.message}</p>
                  </div>
                </div>
              </div>
              <div className="form-box">
                <label htmlFor="note">Notatka do zamówienia</label>
                <textarea id="note" {...form.register("note")} />
                <div className="errors">
                  <p>{form.formState.errors.note?.message}</p>
                </div>
              </div>
              <h3 className="text-3xl font-bold my-3">Opcje wysyłki</h3>
              <div className="space-y-3 mb-4">
                {deliveryMethods.map((method) => {
                  return (
                    <div
                      key={method.id}
                      className="flex flex-row items-center justify-between w-full p-3 border h-12"
                      onClick={() => {
                        form.setValue("delivery_method_id", method.id);
                        setSelectedDeliveryMethod(method);
                        if (method.additional_info_label) {
                          form.setValue("require_additional_info", true);
                        } else {
                          form.setValue("delivery_method_additional_info", undefined);
                          form.setValue("require_additional_info", false);
                        }
                      }}
                    >
                      <div className="space-x-4">
                        <input id={method.id} {...form.register("delivery_method_id")} type="radio" value={method.id} />
                        <label htmlFor={method.id}>{method.name}</label>
                      </div>
                      <p>
                        <PriceDisplay price={method.price} />
                      </p>
                    </div>
                  );
                })}
                <div className="errors">
                  <p>{form.formState.errors.delivery_method_id?.message}</p>
                </div>
              </div>
              {selectedDeliveryMethod && selectedDeliveryMethod.additional_info_label ? (
                <div className="form-box md:w-1/2">
                  <label htmlFor="additional_info">{selectedDeliveryMethod.additional_info_label}</label>
                  <input id="additional_info" {...form.register("delivery_method_additional_info")} />
                  <div className="errors">
                    <p>{form.formState.errors.delivery_method_additional_info?.message}</p>
                  </div>
                </div>
              ) : null}
              <h3 className="text-3xl font-bold my-3">Metoda płatności</h3>
              <div className="space-y-3 mb-4">
                <div className="w-full p-3 border space-y-3">
                  <h3 className="text-2xl font-bold ">Przelew bankowy</h3>
                  <p>
                    Prosimy o dokonanie wpłaty bezpośrednio na nasze konto bankowe. Szczegóły do przelewu, w tym numer
                    konta i tytuł płatności, zostaną wyświetlone w następnym kroku zamówienia. Realizacja zamówienia
                    nastąpi po zaksięgowaniu wpłaty na naszym koncie.
                  </p>
                </div>
              </div>
              <Button type="submit">Zamów</Button>
            </form>
          </div>
          <div className="xl:w-1/3 p-3">
            <div className="space-y-6 border p-3 xl:sticky top-3">
              <h3 className="text-2xl font-bold ">Podsumowanie zamówienia</h3>
              <hr />
              {cart.map((item, index) => {
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex flex-row gap-3 pb-3">
                      <div
                        className="relative h-[100px] aspect-square"
                        style={{
                          backgroundImage: `url(${item.product.photos[0]?.url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <div className="flex-grow space-y-1">
                        <div className="mb-2">
                          <p>{item.product.name}</p>
                        </div>
                        <p>Ilość: {item.quantity}</p>
                        <p>
                          Cena za sztuke: <PriceDisplay price={item.product.price} />
                        </p>
                        <p>
                          Rozmiar:{" "}
                          {item.product.sizes.find((size) => size.id === item.size_id)?.label || "Brak rozmiaru"}
                        </p>
                        <p className="font-bold text-lg">
                          Suma: <PriceDisplay price={item.product.price * item.quantity} />
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div>
                <form onSubmit={promoCodeform.handleSubmit(checkCode)}>
                  <div className="form-box flex-grow-0">
                    <label htmlFor="street">Kod promocyjny</label>
                    <div className="flex flex-row">
                      <input
                        {...promoCodeform.register("code")}
                        type="text"
                        className="flex-grow"
                        onChange={() => setCodeError(null)}
                      />
                      <Button type="submit" className="border-l-0">
                        Zastosuj
                      </Button>
                    </div>
                    <div className="errors">
                      <p>
                        {promoCodeform.formState.errors.code?.message}
                        {codeError}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <hr />
              <div>
                <div className="flex flex-row justify-between p-3">
                  <p className="font-bold">Suma zamówienia:</p>
                  <p className="font-bold">
                    <PriceDisplay price={calcOrderValue()} />
                  </p>
                </div>
                {code && (
                  <div className="flex flex-row justify-between p-3">
                    <p className="font-bold">Po zastosowaniu kodu promocyjnego:</p>
                    <p className="font-bold">
                      <PriceDisplay price={calcOrderValue() - (calcOrderValue() * code.value) / 100} />
                    </p>
                  </div>
                )}
                <div className="flex flex-row justify-between p-3">
                  <p className="font-bold">Koszt wysyłki:</p>
                  <p className="font-bold">
                    <PriceDisplay price={selectedDeliveryMethod?.price || 0} />
                  </p>
                </div>
                <div className="flex flex-row justify-between p-3">
                  <p className="font-bold text-xl">Suma do zapłaty:</p>
                  <p className="font-bold text-xl">
                    <PriceDisplay
                      price={
                        calcOrderValue() +
                        (selectedDeliveryMethod?.price || 0) -
                        (code ? (calcOrderValue() * code.value) / 100 : 0)
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Loader loading={loading} />
    </>
  );
};

export default Page;
