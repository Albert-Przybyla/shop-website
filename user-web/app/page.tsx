import Products from "@/components/Products";
import Slider from "@/components/Slider";
import { Bounce, ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <div className="border-b">
        <Slider />
      </div>
      <div>
        <Products />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
