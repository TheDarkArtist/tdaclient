"use client";

import { LuFileEdit } from "react-icons/lu";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Update = ({ href, userId }: { href: string; userId?: string }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status != "authenticated") {
    return (
      <button className="text-cyan-600" onClick={() => signIn("google")}>
        Login
      </button>
    );
  }

  // Show update button only if:
  // 1. current user has root access
  // 2. current user is the owner of the content
  const shouldShowUpdateButton =
    session?.user &&
    (session.user.access === "root" || session.user.id === userId);

  if (!shouldShowUpdateButton) {
    return null; // or some other UI indicating lack of permission
  }

  const handleUpdate = () => {
    router.push(href);
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleUpdate}
      className="flex items-center gap-2 cursor-pointer"
    >
      <LuFileEdit className="h-6 w-6" />
    </button>
  );
};

export default Update;
