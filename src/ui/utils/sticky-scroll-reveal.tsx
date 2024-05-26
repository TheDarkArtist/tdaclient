"use client";
import React, { useRef, useState, useMemo } from "react";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const cardLength = content.length;

  const backgroundColors = useMemo(() => [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)"
  ], []);

  const linearGradients = useMemo(() => [
    "linear-gradient(to bottom right, var(--cyan), var(--emerald))",
    "linear-gradient(to bottom right, var(--pink), var(--indigo))",
    "linear-gradient(to bottom right, var(--orange), var(--yellow))"
  ], []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const closestBreakpointIndex = Math.round(latest * cardLength);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-6 no-scrollbar"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-lg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className={cn(
          "hidden lg:block h-full w-[50rem] rounded-md bg-white sticky top-0 overflow-hidden",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </motion.div>
    </motion.div>
  );
};


