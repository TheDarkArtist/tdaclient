import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../utils/globals.css";
import Navbar from "@/ui/nav/navbar";
import Providers from "./providers";
import Footer from "@/ui/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kushagra Sharma",
  description: "Up, Above & Beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black/[0.1] dark:bg-black ${inter.className}`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
