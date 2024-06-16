import { Article, Project } from "@prisma/client";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const Body = ({
  setData,
  post,
}: {
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
  post: Article | Project;
}) => {
  return (
    <div className="w-1/2 mt-10 h-full p-4">
      <ReactTextareaAutosize
        className="w-full bg-transparent focus:outline-none  no-scrollbar pb-10 resize-none h-full"
        placeholder="Start Typing..."
        minRows={30}
        defaultValue={post.body}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            body: e.target.value,
          }))
        }
      />
    </div>
  );
};

export default Body;
