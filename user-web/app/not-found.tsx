import Button from "@/components/Button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="container mx-auto my-[100px] px-3 space-y-8 text-center">
      <h2 className="font-extrabold text-9xl text-gray-700">404</h2>
      <p className="text-2xl md:text-3x">Oops!</p>
      <p className="text-2xl md:text-3x">Strona nie została znaleziona</p>
      <p>
        <Link href="/">
          <Button>Wróc do strony głównej</Button>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
