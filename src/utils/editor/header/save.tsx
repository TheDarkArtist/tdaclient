import { _update } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
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
  return (
    <LuSave
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={() => {
        _update(data as Article);
        toast.success("Article Created!");
        router.replace(`/articles/${params.id}`);
        router.refresh();
      }}
    />
  );
};

export default Save;
