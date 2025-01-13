import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";
import FloatingButton from "@/components/FloatingButton";
import { Bounce, ToastContainer } from "react-toastify";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Blue Elephant",
  description: "Blue Elephant – Marka odzieżowa",
  keywords:
    "czapki, akcesoria surfingowe, akcesoria, surfing, styl, moda, odzież plażowa, Blue Elephant, surfing, surf",
  icons: {
    icon: {
      url: "https://blue-elephant.pl/images/logo.png",
    },
    shortcut: {
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
    <html lang="pl">
      <body className={`antialiased`}>
        <Nav />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          toastClassName="bg-background border rounded-none"
        />
        {children}
        <FloatingButton />
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-NHM7NMB8" />
    </html>
  );
}
