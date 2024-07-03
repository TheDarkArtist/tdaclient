"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function ProjectSearch() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="h-[4rem] flex justify-center w-full items-center">
      <input
        className="py-2.5 px-4 rounded-md dark:bg-zinc-950 border dark:border-stone-600/60 border-stone-300 w-full focus:outline-none"
        placeholder="Search for projects"
        defaultValue={searchParams.get("query")?.toString() as string}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
}
