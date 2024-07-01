import { _update as updateArticle } from "@/lib/actions/articles";
import { _update as updateProject } from "@/lib/actions/projects";
import { Article, Project } from "@prisma/client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { LuSave } from "react-icons/lu";
import { toast } from "sonner";

const Save = ({
  data,
  isPendingSave,
}: {
  data: Article | Project;
  isPendingSave: boolean;
}) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const handleSave = async () => {
    try {
      if (source === "articles" || source === "ua") {
        await updateArticle(data as Article);
        toast.success("Article Updated!");
        router.replace(`/articles/${params.id}`);
      } else if (source === "projects" || source === "up") {
        await updateProject(data as Project);
        toast.success("Project Updated!");
        router.replace(`/projects/${params.id}`);
      }
    } catch (error) {
      toast.error("Failed to save!");
    } finally {
      router.refresh();
    }
  };

  return (
    <LuSave
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={handleSave}
    />
  );
};

export default Save;
