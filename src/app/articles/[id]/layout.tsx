import { inter } from "@/ui/fonts";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-dot-cyan-600/[.3] z-[-10] fixed h-screen w-full" />
      <div className={inter.className}>{children}</div>
    </>
  );
};

export default layout;
