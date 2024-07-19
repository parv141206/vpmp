import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VPMP Alumni Portal",
  description: "VPMP alumni portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative `}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
