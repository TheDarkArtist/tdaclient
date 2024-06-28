import React from "react";
import DraftArticlesCount from "./draft-articles-count";
import PublishedArticlesCount from "./published-articles-count";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const AsrticleStats = async () => {
  const user = await getSession();
  return (
    <div className="border w-full dark:border-stone-800 border-stone-400 rounded-md">
      <header className="bg-black/[.2] dark:bg-zinc-900/[.6] rounded-t-md border-b dark:border-stone-800 border-green-600 mb-2 p-2">
        My Articles
      </header>
      {user ? (
        <main className="flex gap-2 m-2">
          <DraftArticlesCount />
          <PublishedArticlesCount />
        </main>
      ) : (
        <Link href={"/login"}>
          <p className="p-4 text-cyan-600 hover:underline">
            login to see stats
          </p>
        </Link>
      )}
    </div>
  );
};

export default AsrticleStats;
