import type { Metadata } from "next";
import { Montserrat, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/hooks/useCart";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nonta | 宠物与人的温暖时光",
  description: "Nonta 宠物用品 — 为你的爱宠提供优质生活",
  icons: { icon: "/favicon.ico", apple: "/nonta-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${montserrat.variable} ${notoSansSC.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F4]">
        <CartProvider>
          <Header />
          <main className="flex-1 pb-14 lg:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <ScrollToTop />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
