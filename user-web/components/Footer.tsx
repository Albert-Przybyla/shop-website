import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t  pb-3">
      <div className="container mx-auto flex flex-col justify-center items-center px-2">
        <Image src="/images/logo.png" alt="Blue Elephant" width={300} height={300} />
        <div className="flex flex-row gap-5 text-md">
          <Link href="/">Regulamin</Link>
          <Link href="/">Polityka prywatności</Link>
          <Link href="/">Kontakt</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
