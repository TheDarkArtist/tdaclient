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
      <body className={`bg-stone-100 dark:bg-black ${inter.className}`}>
        <Providers>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
