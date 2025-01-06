import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import "./globals.css";
import FloatingButton from "@/components/FloatingButton";

export const metadata: Metadata = {
  title: "Blue Elephant",
  description: "Blue Elephant – Marka odzieżowa",
  keywords:
    "czapki, akcesoria surfingowe, akcesoria, surfing, styl, moda, odzież plażowa, Blue Elephant, surfing, surf",
  icons: {
    icon: {
      url: "https://blue-elephant.pl/images/logo.png",
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://blue-elephant.pl",
    siteName: "Blue Elephant",
    title: "Blue Elephant",
    description: "Blue Elephant – Marka odzieżowa",
    images: [
      {
        url: "https://blue-elephant.pl/images/logo.png",
        width: 800,
        height: 800,
        alt: "Logo Blue Elephant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://blue-elephant.pl",
    title: "Blue Elephant",
    description: "Blue Elephant – Marka odzieżowa",
    images: ["https://blue-elephant.pl/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
        <FloatingButton />
        <Footer />
      </body>
    </html>
  );
}
