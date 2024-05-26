"use client";

import { _delete } from "@/lib/actions/projects";
import { LuTrash } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const ProjectDeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "unauthenticated") {
    return;
  }

  // Show delete button only if
  // 1. current user has root access
  // 2. current user wrote the article

  if (data && data.user.access != "root" && id != data?.user.id) {
    return;
  }

  const d = async () => {
    await _delete(id);
    router.push("/projects");
    router.refresh();
  };
  return (
    <form action={d}>
      <button className="flex items-center space-x-2 border dark:border-stone-600 p-2 rounded-md">
        <LuTrash width={18} />
        <span className="md:inline hidden">Delete</span>
      </button>
    </form>
  );
};

export default ProjectDeleteBtn;
