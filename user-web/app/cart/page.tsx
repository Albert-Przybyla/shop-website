"use client";
import React, { useEffect } from "react";
import { CartService } from "@/services/cartService";
import Loader from "@/components/Loader";
import { Product } from "@/types/types.response";
import { fetchProduct } from "@/api/product";
import Button from "@/components/Button";
import Link from "next/link";

type CartItem = {
  product_id: string;
  quantity: number;
  size_id: string;
  product: Product;
};

const Page = () => {
  const [Cart, setCart] = React.useState<CartItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const cartFromCookie = CartService.getCart();
    const cart: CartItem[] = [];
    for (const item of cartFromCookie) {
      const res = await fetchProduct(item.product_id);
      cart.push({
        product_id: item.product_id,
        quantity: item.quantity,
        size_id: item.size_id,
        product: res,
      });
    }
    setCart(cart);

    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto my-[100px] space-y-6 max-w-[800px]">
        <h1 className="text-3xl font-bold px-3 text-center">Koszyk</h1>
        <div className="flex flex-col gap-6">
          {Cart.map((item, index) => {
            return (
              <div key={index} className="border p-4 md:h-[230px] flex flex-col md:flex-row gap-6">
                <div
                  className="relative h-full  aspect-square"
                  style={{
                    backgroundImage: `url(${item.product.photos[0]?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="flex-grow space-y-2 ">
                  <div className="mb-2 flex flex-row justify-between text-xl w-full">
                    <p>{item.product.name}</p>
                    <p>{item.product.price * item.quantity} PLN</p>
                  </div>
                  <p>Ilość: {item.quantity}</p>
                  <p>Cena: {item.product.price} PLN</p>
                  <p>
                    Rozmiar: {item.product.sizes.find((size) => size.id === item.size_id)?.label || "Brak rozmiaru"}
                  </p>
                  <Button
                    onClick={() => {
                      CartService.removeItem(item.product_id, item.size_id);
                      getData();
                    }}
                    type="button"
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            );
          })}
          {Cart.length === 0 && (
            <div className="flex flex-col justify-center items-center px-3">
              <p className="text-center p-6">Twoj koszyk jest pusty!</p>
              <Link href="/">
                <Button type="button">Wroc do sklepu</Button>
              </Link>
            </div>
          )}
          {Cart.length > 0 && (
            <div className="flex flex-row justify-end gap-3 px-3">
              <Link href="/checkout">
                <Button>Do płatności</Button>
              </Link>
              <Button
                onClick={() => {
                  CartService.clearCart();
                  getData();
                }}
                type="button"
              >
                Wyczysć koszyk
              </Button>
            </div>
          )}
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
};

export default Page;
