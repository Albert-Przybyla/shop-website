import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MobileNav from "./MobileNav";

const Nav = () => {
  return (
    <nav className="border-b py-1">
      <div className="container mx-auto flex justify-between items-center px-2">
        <Link href="/">
          <Image src="/images/logo-min.png" alt="Blue Elephant" width={200} height={200} />
        </Link>
        <MobileNav />
        <div className="hidden md:flex flex-row items-center justify-end gap-3 text-lg">
          <Link href="/about-us" className="hover:underline">
            O nas
          </Link>
          <div className="w-2 h-2 rounded-full border border-foreground " />
          <Link href="/contact" className="hover:underline">
            Kontakt
          </Link>
          <div className="w-2 h-2 rounded-full border border-foreground " />
          <Link href="/cart" className="hover:underline">
            Koszyk
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
