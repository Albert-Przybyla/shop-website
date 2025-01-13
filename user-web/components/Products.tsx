import { fetchProducts } from "@/api/product";
import { PagedResponse } from "@/types/base.types";
import { Product } from "@/types/types.response";
import NavBtn from "./actions/NavBtn";
import { PriceDisplay } from "./utils";

const Products = async () => {
  const products: PagedResponse<Product> = await fetchProducts();
  return (
    <div className="container mx-auto my-[100px]">
      <h1 className="text-3xl font-bold px-3 text-center">Produkty</h1>
      <div className="flex flex-col md:flex-row flex-wrap py-6 px-3 mx-auto gap-6 justify-center">
        {products?.items.map((product) => {
          return (
            <div key={product.id} className="border p-4 w-full md:w-1/2 xl:w-1/4 flex flex-col items-center gap-3">
              <div className="relative w-full aspect-square">
                {product.photos.length > 0 && (
                  <div
                    style={{
                      backgroundImage: `url(${product.photos[0].url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="w-full h-full"
                  ></div>
                )}
              </div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p>
                <PriceDisplay price={product.price} />
              </p>
              <div className="flex felx-row gap-2">
                <NavBtn route={`/product/${product.id}`}>Szczegóły</NavBtn>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
