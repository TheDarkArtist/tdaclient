import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { _delete as _deleteArticle } from "@/lib/actions/articles";
import { _delete as _deleteProject } from "@/lib/actions/projects";

const DiscardBtn = ({ id, published }: { id: string; published: boolean }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return !published ? (
    <button
      onClick={() => {
        if (searchParams.get("source") === "articles") {
          _deleteArticle(id);
        } else if (searchParams.get("source") === "projects")
          _deleteProject(id);
        router.back();
      }}
      className="border dark:border-stone-600 border-stone-400 px-4 rounded-md"
    >
      Discard
    </button>
  ) : (
    <button
      onClick={() => {
        if (searchParams.get("source") === "articles") {
          router.push("/articles");
          router.refresh();
        } else if (searchParams.get("source") === "ua") {
          router.push(`/articles/${id}`);
          router.refresh();
        } else if (searchParams.get("source") === "projects") {
          router.push(`/projects`);
          router.refresh();
        } else if (searchParams.get("source") === "up") {
          router.push(`/projects/${id}`);
          router.refresh();
        }
      }}
      className="border dark:border-stone-600 border-stone-400 px-4 rounded-md"
    >
      Back
    </button>
  );
};

export default DiscardBtn;
