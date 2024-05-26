"use client";

import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = ({ href }: { href?: string }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      className="p-2 h-min space-x-2 flex border dark:border-stone-600 rounded-md dark:hover:border-stone-500"
    >
      <LuArrowLeft />
      <span className="md:inline hidden">Back</span>
    </button>
  );
};

export default GoBack;
