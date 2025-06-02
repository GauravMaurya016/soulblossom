import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { Providers } from "./redux/provider";
import Script from "next/script";

const inter = Anonymous_Pro({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "SoulBlossom",
  description: "Blooming Beauty Delivered",
  icons: {
    icon: "/public/amex.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-neutral-100 ${inter.className}`}>
        <Providers>
          <ClerkProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </ClerkProvider>
        </Providers>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
