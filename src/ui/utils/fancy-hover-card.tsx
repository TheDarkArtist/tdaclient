"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { LuBot } from "react-icons/lu";

export const EvervaultCard = ({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div className="md:mr-4 md:my-4 border dark:border-stone-800 border-gray-200 rounded-3xl m-4 bg-white dark:bg-black">
      <div
        className={cn(
          " bg-transparent aspect-square  flex items-center justify-center w-full h-ful relative ",
          className
        )}
      >
        <div
          onMouseMove={onMouseMove}
          className="group/card rounded-t-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
        >
          <CardPattern
            mouseX={mouseX}
            mouseY={mouseY}
            randomString={randomString}
          />
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative h-44 w-44  rounded-full flex items-center justify-center text-white font-bold text-4xl">
              <div className="absolute w-full h-full bg-white/[0.8] dark:bg-black/[0.8] blur-sm rounded-full" />
              <div className="dark:text-white text-black z-20">
                <div className="rounded-full">
                  <Image
                    className="rounded-full"
                    src={"/me.png"}
                    alt="kushagra sharma"
                    height={400}
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="space-y-1">
          <h1 className="md:text-[2vw] text-3xl text-center font-bold leading-none">
            Kushagra Sharma
          </h1>
          <p className="flex gap-2 w-full items-center justify-center text-sm ">
            <LuBot width={16} />
            Developer
          </p>
        </div>
        <p className="m-4 text-gray-600 dark:text-gray-400">
          I like to think of myself as a problem solver, who uses tech to solve
          problems arround him, It feels funny when you talk about youself in
          third person :)
        </p>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-t-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-t-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-t-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
