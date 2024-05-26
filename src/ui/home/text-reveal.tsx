"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/ui/utils/text-reveal-card";

export function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center dark:bg-[#0E0E10] bg-gray-200 dark:bg-dot-cyan-800 bg-grid-black/[0.2] h-[30rem] rounded-2xl w-full">
      <TextRevealCard text="You Are The Audience" revealText="I Am The One Hostng :)">
        <TextRevealCardTitle>
         A Passionate Coder, Hmm, That Sounds Great.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          By day I&apos;m a software developer trying to understand different
          concepts, implementing projects on them, By night i dwelve deep into
          cyber-sec understanding different concepts.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
