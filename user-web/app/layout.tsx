import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
      <body className={`antialiased`}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
