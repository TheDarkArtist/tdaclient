"use client";

import { LuPencil } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

// It shoud show if following conditions are met.
// session.userId = article.userId
// session.user.access == 'root'

const Update = ({ href, userId }: { href: string; userId?: string }) => {
  const router = useRouter();
  const { data, status } = useSession();

  if (status === "unauthenticated") return;
  if (data && data.user.access != "root" && data.user.id !== userId) {
    return;
  }

  return (
    <button
      onClick={() => {
        router.push(href);
        router.refresh();
      }}
      className={`flex h-min items-center border dark:border-stone-600 space-x-1 rounded-md p-2`}
    >
      <LuPencil width={18} />
      <span className="md:inline hidden">Update</span>
    </button>
  );
};

export default Update;
