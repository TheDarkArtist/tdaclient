import { _delete as deleteArticle } from "@/lib/actions/articles";
import { _delete as deleteProject } from "@/lib/actions/projects";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LuTrash } from "react-icons/lu";

const Delete = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <LuTrash
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={async () => {
        if (searchParams.get("source") === "articles") {
          await deleteArticle(params.id as string);
          router.replace("/articles");
        } else if (searchParams.get("source") === "projects") {
          await deleteProject(params.id as string);
          router.replace("/projects");
        }

        router.refresh;
      }}
    />
  );
};

export default Delete;
