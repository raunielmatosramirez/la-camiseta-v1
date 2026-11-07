import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PickupMapModal from "@/components/pickup-map-modal";
import { CartProvider } from "@/context/cart-context";

export const metadata: Metadata = {
  title: "La Camiseta - Camisetas de fútbol",
  description: "Camisetas de fútbol de todas las épocas y equipos",
};

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var dark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <head>
        <Script
          id='theme-script'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body className='font-sans antialiased'>
        <CartProvider>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
          <PickupMapModal />
        </CartProvider>
      </body>
    </html>
  );
}
