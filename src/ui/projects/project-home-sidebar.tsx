import React from "react";

const ProjectHomeSidebar = () => {
  return (
    <div className="hidden md:flex flex-col gap-4 w-full max-w-sm mx-4">
      <div className="border h-min w-full rounded-md dark:border-stone-600 border-gray-200 dark:bg-black bg-white">
        <header className="bg-black/[.2] dark:bg-zinc-900/[.6] rounded-t-md border-b dark:border-stone-600 mb-2 p-2">
          Section 1
        </header>
        <main className="p-2">just the way you did so easily</main>
      </div>
      <div className="border h-min w-full rounded-md dark:border-stone-600 border-gray-200 dark:bg-black bg-white">
        <header className="bg-black/[.2] dark:bg-zinc-900/[.6] rounded-t-md border-b dark:border-stone-600 mb-2 p-2">
          Section 2
        </header>
        <main className="p-2">just the way you did so easily</main>
      </div>
      <div className="border h-min w-full rounded-md dark:border-stone-600 border-gray-200 dark:bg-black bg-white">
        <header className="bg-black/[.2] dark:bg-zinc-900/[.6] rounded-t-md border-b dark:border-stone-600 mb-2 p-2">
          Section 3
        </header>
        <main className="p-2">just the way you did so easily</main>
      </div>
    </div>
  );
};

export default ProjectHomeSidebar;
