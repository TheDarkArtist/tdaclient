"use client";
import React from "react";
import { Boxes } from "@/ui/utils/bg-boxes";
import { cn } from "@/utils/cn";
import { Meteors } from "../utils/meteor";

export function BackgroundBoxes() {
  return (
    <div className="h-96 dark:bg-black relative w-full overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full dark:bg-black/[0.8] bg-transparent/5 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1
        className={cn(
          "md:text-6xl md:font-bold text-xl bg-clip-text text-transparent dark:bg-gradient-to-b dark:from-green-600 dark:to-green-800 relative bg-gradient-to-b from-sky-800 to-sky-600 z-20"
        )}
      >
        Welcome
      </h1>
      <p className="text-center font-bold max-w-lg mt-2 relative z-20 text-green-600 dark:text-sky-600">
        Read awesome project, article. Create your own. Share your insight with
        other.
      </p>
      <Meteors number={50} />
    </div>
  );
}
