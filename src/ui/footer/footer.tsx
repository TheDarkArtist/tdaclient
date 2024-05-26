import React from "react";
import { SparklesCore } from "../utils/sparkles";

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-60 relative mt-10 dark:bg-dot-red-900">
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={1}
        particleDensity={200}
        className="h-full w-full absolute bottom-0"
        particleColor="#1793D1"
      />
    </div>
  );
};

export default Footer;
