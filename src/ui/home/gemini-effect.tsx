"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/ui/utils/gemini-effect";

export function GeminiEffect() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.4]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.7]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.6]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.6]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.68]);

  return (
    <div
      className="md:h-[52rem] h-[40rem] z-10 dark:bg-black bg-transparent border w-full dark:border-white/[0.1] mt-4 rounded-md relative md:pt-[26rem] pt-[25rem] overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        title="Creativity + Ideas  = Projects"
        description="In Order To Create Something Awesome You Have To Find Yourself."
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}
