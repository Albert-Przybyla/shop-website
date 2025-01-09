import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Head from "next/head";
import "./globals.css";
import FloatingButton from "@/components/FloatingButton";
import { Bounce, ToastContainer } from "react-toastify";
import Script from "next/script";

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
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NHM7NMB8');
          `}
        </Script>
        <link rel="icon" href="/images/logo-max.png" />
      </Head>
      <body className={`antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHM7NMB8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GTM-NHM7NMB8" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
    </html>
  );
}
