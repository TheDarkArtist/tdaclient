import { _update } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

type BodyProps = {
  setData: Dispatch<SetStateAction<Article | Project>>;
  post: Article | Project;
  handleSave: () => void;
};

const Body: React.FC<BodyProps> = ({ setData, post, handleSave }) => {
  return (
    <div className="w-1/2 mt-10 h-full p-4">
      <ReactTextareaAutosize
        className="w-full bg-transparent focus:outline-none no-scrollbar pb-10 resize-none h-full"
        placeholder="Start Typing..."
        minRows={30}
        defaultValue={post.body}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            body: e.target.value,
          }))
        }
        onBlur={handleSave}
      />
    </div>
  );
};

export default Body;
