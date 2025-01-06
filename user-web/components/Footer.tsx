import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t  pb-3">
      <div className="container mx-auto flex flex-col justify-center items-center px-2">
        <Image src="/images/logo.png" alt="Blue Elephant" width={300} height={300} />
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-5 text-md">
          <Link href="/statute">Regulamin</Link>
          <div className="w-2 h-2 rounded-full border border-foreground hidden md:block" />
          <Link href="/privacy-policy">Polityka prywatności</Link>
          <div className="w-2 h-2 rounded-full border border-foreground hidden md:block" />
          <Link href="/returns">Zwroty i Reklamacje</Link>
          <div className="w-2 h-2 rounded-full border border-foreground hidden md:block" />
          <Link href="/contact">Kontakt</Link>
          <div className="w-2 h-2 rounded-full border border-foreground hidden md:block" />
          <Link href="https://www.instagram.com/blueelephantt_?igsh=Mm9tODhscnk2YzJm">Instagram</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
