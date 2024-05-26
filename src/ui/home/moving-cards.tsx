"use client";

import { InfiniteMovingCards } from "@/ui/utils/infinite-moving-cards";
import { testimonials } from "@/data/data";

export function MovingCards() {
  return (
    <div className="min-h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
