"use client";

import { ThemeProvider } from "@/ui/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
