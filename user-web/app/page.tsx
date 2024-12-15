import { fetchProducts } from "@/api/product";
import FloatingButton from "@/components/FloatingButton";
import Products from "@/components/products";
import Slider from "@/components/Slider";
import { PagedResponse } from "@/models/pagedResponse.model";

export default function Home() {
  return (
    <>
      <div className="border-b">
        <Slider />
      </div>
      <div>
        <Products />
      </div>
      <FloatingButton />
    </>
  );
}
