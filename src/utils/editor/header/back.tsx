import { _delete as deleteArticle } from "@/lib/actions/articles";
import { _delete as deleteProject } from "@/lib/actions/projects";
import { Article, Project } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

const Back = ({ data }: { data: Article | Project }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <LuArrowLeft
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={() => {
        if (data.body === "") {
          if (searchParams.get("source") === "articles") deleteArticle(data.id);
          else if (searchParams.get("source") === "projects")
            deleteProject(data.id);
        }
        router.back();
        router.refresh();
      }}
    />
  );
};

export default Back;
