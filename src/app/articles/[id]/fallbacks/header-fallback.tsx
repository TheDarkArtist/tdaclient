import React from "react";

const HeaderFallback = () => {
  return (
    <div className="dark:bg-red-950 bg-gray-200 p-4 rounded-t-md md:h-32 h-28 relative">
      <div className="flex space-x-2 rounded-md justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-stone-200/10 border-stone-800 md:h-16 md:w-16 h-12 w-12" />
          <div className="w-40 space-y-2">
            <div className="h-1.5 w-12 rounded-full bg-stone-300/10" />
            <div className="h-1.5 rounded-full bg-stone-300/10" />
            <div className="h-1.5 rounded-full bg-stone-300/10" />
          </div>
        </div>
        <div className="flex h-min items-center gap-3">
          <div className="h-6 w-6 bg-stone-200/10 rounded-md" />
          <div className="h-6 w-6 bg-stone-200/10 rounded-md" />
          <div className="h-6 w-6 bg-stone-200/10 rounded-md" />
        </div>
      </div>
      <div className="flex h-min justify-between items-start py-2">
        <div className="bg-stone-200/10 rounded-full w-40 h-2 " />
        <div className="flex space-x-2">
          <div className="bg-stone-200/10 w-20 h-2" />
        </div>
      </div>
    </div>
  );
};

export default HeaderFallback;
