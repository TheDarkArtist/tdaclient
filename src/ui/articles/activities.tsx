import React from "react";
import { getSession } from "@/lib/auth";
import Link from "next/link";

const Activites = async () => {
  const user = await getSession();
  return (
    <div className="border dark:border-stone-800 border-stone-400 rounded-md">
      <header className="bg-black/[.2] dark:bg-zinc-900/[.6] rounded-t-md border-b dark:border-stone-800 border-green-600 mb-2 p-2">
      Activites
      </header>
      {user ? (
        <main className="flex text-cyan-600 flex-col gap-2 m-2">
        <p>Some Activites, idk, maybe</p>
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

export default Activites;
