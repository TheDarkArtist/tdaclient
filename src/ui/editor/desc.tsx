import { Article, Project } from "@prisma/client";
import React, { ChangeEvent, FC } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface DescriptionProps {
  data: Article | Project;
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
  handleSave: () => void;
}

const Description: FC<DescriptionProps> = ({ data, setData, handleSave }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  return (
    <ReactTextareaAutosize
      placeholder="Description"
      value={data.description || ""}
      onChange={(e) => handleChange(e)}
      onBlur={handleSave}
      className="bg-transparent w-full resize-none focus:outline-none"
    />
  );
};

export default Description;
