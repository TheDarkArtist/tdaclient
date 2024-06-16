"use client";

import { LuArrowLeft, LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = ({ href }: { href?: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => (href ? router.push(href) : router.back())}>
      <LuArrowLeft className="h-6 w-6 my-auto" />
    </button>
  );
};

export default GoBack;
