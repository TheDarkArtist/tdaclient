import { Comic_Neue, Megrim } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Notification from "@/components/Notification";
import SidebarProvider from "@/providers/SidebarProvider";
import NavbarProvider from "@/providers/NavbarProvider";
import Provider from "@/providers/Provider";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

const comic = Comic_Neue({ subsets: ["latin"], weight: "400" });
const tda = Megrim({ subsets: ["latin"], weight: "400" });

export const metadata = {
  metadataBase: new URL("https://thedarkartist.in"),
  title: {
    default: "Kushagra Sharma",
  },
  description: `
Explore a range of software development endeavors, from intricate coding projects to innovative solutions. Delve into the art of hacking, where security meets creativity, and witness firsthand the expertise honed over years of passionate exploration.`,
  twitter: {
    card: "summary_large_image",
  },
  keywords:
    "tda, the dark artist, portfolio , Kushagra, kushagra sharma, tda projects, kush, IAmKushagraSharma, i am kushagra sharma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${comic.className} flex flex-col justify-between h-screen`}
      >
        <div>
          <Provider>
            <Notification />
            <NavbarProvider />
            <SidebarProvider />
            <main className="pt-12 md:pt-16">
              {children}
              <SpeedInsights />
              <Analytics />
            </main>
          </Provider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
