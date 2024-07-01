import { _update as updateArticle } from "@/lib/actions/articles";
import { _update as updateProject } from "@/lib/actions/projects";
import { Article, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdCloud, MdCloudDone } from "react-icons/md";
import { toast } from "sonner";

const Publish = ({ data }: { data: Article | Project }) => {
  const [published, setPublished] = useState(data.published);
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const handleTogglePublish = async () => {
    if (data.body === "") {
      alert("You can't publish an empty article");
      return;
    }

    const newPublishedStatus = !published;

    try {
      if (source === "articles" || source === "ua") {
        await updateArticle({
          ...(data as Article),
          published: newPublishedStatus,
        });
      } else if (source === "projects" || source === "up") {
        await updateProject({
          ...(data as Project),
          published: newPublishedStatus,
        });
      }

      setPublished(newPublishedStatus);
      toast(newPublishedStatus ? "Published" : "Unpublished");
    } catch (error) {
      console.error("Failed to update:", error);
      toast("Failed to update");
    }
  };

  return (
    <>
      {published ? (
        <MdCloudDone
          className="h-6 w-6 cursor-pointer hover:text-red-400"
          onClick={handleTogglePublish}
        />
      ) : (
        <MdCloud
          className="h-6 w-6 cursor-pointer"
          onClick={handleTogglePublish}
        />
      )}
    </>
  );
};

export default Publish;
