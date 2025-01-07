import Products from "@/components/Products";
import Slider from "@/components/Slider";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <div className="border-b">
        <Slider />
      </div>
      <div>
        <Products />
      </div>
    </>
  );
}
