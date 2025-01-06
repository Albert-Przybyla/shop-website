"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <button onClick={toggleMenu} className="md:hidden text-xl focus:outline-none z-[3] mr-5">
        <Menu className="text-6xl" />
      </button>
      <nav
        className={`md:hidden z-[2] h-screen w-screen bg-[#efe8e8] fixed transition-all duration-300 top-0 left-0 flex flex-col items-center justify-center left space-y-6 text-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/" className="py-2" onClick={() => setIsMenuOpen(false)}>
          Strona główna
        </Link>
        <Link href="/about-us" className="py-2" onClick={() => setIsMenuOpen(false)}>
          O nas
        </Link>
        <Link href="/contact" className=" py-2" onClick={() => setIsMenuOpen(false)}>
          Kontakt
        </Link>
        <Link href="/cart" className=" py-2" onClick={() => setIsMenuOpen(false)}>
          Koszyk
        </Link>
      </nav>
    </>
  );
};

export default MobileNav;
