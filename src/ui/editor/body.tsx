import { Article, Project } from "@prisma/client";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface BodyProps {
  data: Article | Project;
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
  handleSave: () => void;
}

const Body: React.FC<BodyProps> = ({ data, setData, handleSave }) => {
  return (
    <ReactTextareaAutosize
      className="bg-transparent w-full focus:outline-none resize-none"
      value={data.body}
      placeholder="Let's write something here..."
      minRows={14}
      onChange={(e) => {
        setData((prevData) => ({ ...prevData, body: e.target.value }));
      }}
      onBlur={handleSave}
    />
  );
};

export default Body;
