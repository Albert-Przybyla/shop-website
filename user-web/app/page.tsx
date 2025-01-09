import Products from "@/components/Products";
import Slider from "@/components/Slider";
import { GoogleAnalytics } from "nextjs-google-analytics";
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <div className="border-b">
        <Slider />
      </div>
      <div>
        <Products />
      </div>
    </>
  );
}
