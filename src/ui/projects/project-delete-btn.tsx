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

  if (data && data.user && data.user.access != "root" && id != data?.user.id) {
    return;
  }

  const del = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await _delete(id);
      router.push("/projects");
      router.refresh();
    }
  };

  return <LuTrash className="h-6 w-6 cursor-pointer" onClick={del} />;
};

export default ProjectDeleteBtn;
