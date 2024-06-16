"use client";

import { _delete } from "@/lib/actions/articles";
import { LuTrash } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import React from "react";

const ArticleDeleteBtn = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, status } = useSession();
  if (status === "unauthenticated") {
    return;
  }

  // Show delete button only if
  // 1. current user has root access
  // 2. current user wrote the article

  if (data && data.user && data.user.access != "root" && id != data?.user.id) {
    return;
  }

  const del = async () => {
    await _delete(id);
    router.push("/articles");
    router.refresh();
  };
  return <LuTrash className="h-6 w-6 cursor-pointer" onClick={del} />;
};

export default ArticleDeleteBtn;
