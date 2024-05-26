import { updateArticleMetadata } from "@/lib/actions/articles";
import { updateProjectMetadata } from "@/lib/actions/projects";
import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import LoadingDots from "@/ui/utils/loading.dots";
import { toast } from "sonner";
import { Article, Project } from "@prisma/client";

interface PublishBtnProps {
  id: string;
  published: boolean;
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
}

const PublishBtn: React.FC<PublishBtnProps> = ({ id, published, setData }) => {
  const [isPendingPublishing, setIsPendingPublishing] = useState(false);
  const searchParams = useSearchParams();

  const handlePublish = async () => {
    setIsPendingPublishing(true);
    const formData = new FormData();
    formData.append("published", String(!published));

    try {
      if (searchParams.get("source") === "articles") {
        await updateArticleMetadata(formData, id, "published");
      } else if (searchParams.get("source") === "projects") {
        await updateProjectMetadata(formData, id, "published");
      } else {
        throw new Error("Invalid source");
      }
      toast.success(
        `Successfully ${published ? "unpublished" : "published"} your post.`
      );
      setData((prev) => ({ ...prev, published: !prev.published }));
    } catch (error) {
      console.error(error);
      // Handle error display or redirect here
    } finally {
      setIsPendingPublishing(false);
    }
  };

  return (
    <button
      onClick={handlePublish}
      className={cn(
        "flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none",
        isPendingPublishing
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border border-stone-300 dark:bg-black dark:text-white hover:bg-stone-200 hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
      )}
      disabled={isPendingPublishing}
    >
      {isPendingPublishing ? (
        <LoadingDots />
      ) : (
        <p>{published ? "Unpublish" : "Publish"}</p>
      )}
    </button>
  );
};

export default PublishBtn;
