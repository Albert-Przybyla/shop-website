import { fetchProduct } from "@/api/product";
import ProductSlider from "@/components/ProductSlider";
import { PriceDisplay } from "@/components/utils";
import AddToCartForm from "@/forms/AddToCartForm";
import { Product } from "@/types/types.response";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;

  let product: Product;
  try {
    product = await fetchProduct(id);
  } catch {
    return notFound();
  }
  return (
    <div className="container mx-auto my-[100px]">
      <div className="flex flex-col md:flex-row gap-6 px-3">
        <div className="md:w-1/2 flex flex-col justify-center items-center">
          <ProductSlider photos={product.photos} />
        </div>
        <div className="md:w-1/2 space-y-6 px-6">
          <div className="space-y-2">
            <h3 className="text-3xl">{product.name}</h3>
            <h4 className="text-4xl font-thin">
              <PriceDisplay price={product.price} />
            </h4>
          </div>
          <div className="space-y-2">
            <h6 className="text-xl">Opis</h6>
            <p>{product.description}</p>
            <p>{product.aditional_description}</p>
          </div>
          <div>
            <h6>Materiał</h6>
            <p>{product.material}</p>
          </div>
          <AddToCartForm product_id={product.id} sizes={product.sizes} />
        </div>
      </div>
    </div>
  );
};

export default Page;
