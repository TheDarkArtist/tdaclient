"use client";
import React from "react";
import { BackgroundBeams } from "@/ui/utils/bg-beams";

export function ContactForm() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Leave A Message For Me :)
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-center relative z-10">
          I&apos;m currently pursuing my bachelor degree, Going to be a computer
          science engineer officialy soon. I&apos;m looking always for
          oppurtunities so if you have one in your sight tell me all about it.
          you can leave a message here or contact me thrugh andy of the social
          platforms.
        </p>
        <input
          type="text"
          placeholder="kushagra@thedarkartist.in"
          className="rounded-lg border border-neutral-800 p-2 focus:outline-none focus:border-cyan-600  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
  );
}
