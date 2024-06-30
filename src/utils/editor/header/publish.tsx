import { _update } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";
import React, { useState } from "react";
import { MdCloud, MdCloudDone } from "react-icons/md";
import { toast } from "sonner";

const Publish = ({ data }: { data: Article | Project }) => {
  const [published, setPublished] = useState(data.published);

  const handleTogglePublish = async () => {
    if (data.body === "") {
      alert("You Can't Publish an Empty Article");
      return;
    }
    const newPublishedStatus = !published;
    await _update({ ...(data as Article), published: newPublishedStatus });
    setPublished(newPublishedStatus);
    toast(newPublishedStatus ? "published" : "unpublished");
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
