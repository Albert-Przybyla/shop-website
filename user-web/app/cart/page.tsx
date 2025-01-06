"use client";
import React, { useEffect } from "react";
import { CartService } from "@/services/cartService";
import Loader from "@/components/Loader";
import { Product } from "@/types/types.response";
import { fetchProduct } from "@/api/product";
import Button from "@/components/Button";
import Link from "next/link";
import { ExternalLink, Link2, Minus, Plus, SquareArrowOutUpLeft, SquareArrowOutUpRight } from "lucide-react";

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
      let res: Product;
      try {
        res = await fetchProduct(item.product_id);
      } catch {
        CartService.removeItem(item.product_id, item.size_id);
        continue;
      }
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
      <div className="container mx-auto my-[100px] space-y-6 max-w-[800px] px-3">
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

                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="mb-2 flex flex-row justify-between text-xl w-full">
                      <p>
                        <span>{item.product.name}</span>
                        <Link href={`/product/${item.product.id}`}>
                          <ExternalLink
                            width={16}
                            height={16}
                            className="inline cursor-pointer ml-1 relative bottom-[1px] transition-all duration-300 hover:text-primary"
                          />
                        </Link>
                      </p>
                      <p>{item.product.price * item.quantity} PLN</p>
                    </div>
                    <p>Cena: {item.product.price} PLN</p>
                    <p>
                      Rozmiar: {item.product.sizes.find((size) => size.id === item.size_id)?.label || "Brak rozmiaru"}
                    </p>
                  </div>
                  <div className="flex flex-row justify-between pt-3">
                    <div className="flex flex-row gap-2">
                      <Button
                        onClick={() => {
                          CartService.updateItemQuantity(item.product_id, item.size_id, item.quantity - 1);
                          getData();
                        }}
                        disabled={item.quantity === 1}
                        type="button"
                      >
                        <Minus />
                      </Button>
                      <Button type="button">{item.quantity} szt.</Button>
                      <Button
                        onClick={() => {
                          CartService.updateItemQuantity(item.product_id, item.size_id, item.quantity + 1);
                          getData();
                        }}
                        type="button"
                      >
                        <Plus width={20} />
                      </Button>
                    </div>
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
