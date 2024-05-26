import Image from "next/image";
import React from "react";
import { BentoGrid, BentoGridItem } from "../utils/bento-grid";

export function HomeGrid() {
  return (
    <BentoGrid className="md:auto-rows-auto ">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({ src }: { src: string }) => (
  <div className="flex w-full h-min rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
    <Image
      src={src}
      alt="card-image"
      className="w-full h-fit rounded-xl"
      height={400}
      width={600}
    />
  </div>
);

const items = [
  {
    title: "The Programmer",
    description:
      "Dive into the world of technology, hacking, and software development with my personal portfolio website. Here, you&apos;ll find a curated collection of projects, achievements, and insights that reflect my journey in the realms of coding, hacking, and beyond.",
    header: <Skeleton src="/unsplash/corner-desk.jpg" />,
    className: "md:col-span-2",
  },
  {
    title: "Our Projects Define Our Thinking.",
    description:
      "Explore a range of software development endeavors, from coding projects to innovative solutions. Delve into the art hacking, where security meets creativity, and witness the expertise honed over years of passionate exploration.",
    header: <Skeleton src="/unsplash/key-coffee.jpg" />,
    className: "md:col-span-1",
  },
  {
    title: "The Art of Coding",
    description:
      "But this website isn't just about code; it's reflection of my journey, my philosophies, and my perspective the ever-evolving landscape of technology. Join me in the mysteries of AI, pondering the depths of thought, and navigating the endless possibilities that emerge the intersection of man and machine.",
    header: <Skeleton src="/unsplash/heart-coder.jpg" />,
    className: "md:col-span-1",
  },
  {
    title: "Those Who Are Always In Search Of Knowledge",
    description:
      "Whether you're a fellow coder seeking inspiration, a mind hungry for knowledge, or simply an enthusiast eager explore the digital frontier, you're invited to embark this journey with me.",
    header: <Skeleton src="/unsplash/fellow-coder.jpg" />,
    className: "md:col-span-2",
  },
];
