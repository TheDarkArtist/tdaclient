"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const BodyFallback = () => {
  return (
    <div className="w-full flex justify-center items-start dark:text-gray-300 dark:bg-[#111111] bg-white p-4 h-40 overflow-hidden bg-grid-stone-600/10 space-y-4">
      <RotatingLines
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        width="29"
      />
    </div>
  );
};

export default BodyFallback;
