import { InstagramIcon } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto my-[100px] flex items-center justify-center px-3">
      <div className="border py-6 px-12 md:px-24 text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            W celu dokonania zwrotu/wymiany <br /> produktów skontaktuj się z nami:
          </h1>
          <p>
            <a href="mailto:firma.bluelephant@gmail.com">firma.bluelephant@gmail.com</a>
          </p>
        </div>

        <div className="flex justify-center">
          <a href="https://www.instagram.com/blueelephantt_?igsh=Mm9tODhscnk2YzJm">
            <InstagramIcon width={30} height={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
