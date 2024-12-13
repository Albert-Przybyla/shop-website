import Image from "next/image";
import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="border-b py-1">
      <div className="container mx-auto flex justify-between items-center px-2">
        <Image src="/images/logo-min.png" alt="Blue Elephant" width={200} height={200} />
        <div className="flex gap-5 text-lg">
          <Link href="/">O nas</Link>
          <Link href="/">Kontakt</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
