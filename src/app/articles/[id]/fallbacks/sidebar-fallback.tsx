import React from "react";

const SidebarFallback = () => {
  return (
    <div className="relative dark:bg-[#111111] bg-white h-[40rem] p-4 max-w-[20rem] rounded-md hidden md:block">
      <h1 className="pb-4 text-2xl font-bold text-sky-600">
        Table of Contents
      </h1>
    </div>
  );
};

export default SidebarFallback;
