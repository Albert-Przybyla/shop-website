import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Blue Elephant",
  description: "Marka",
  icons: {
    icon: {
      url: "https://blue-elephant.pl/images/logo.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/images/logo-max.png" />
      </Head>
      <body className={`antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
