import { Article, Project } from "@prisma/client";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface TitleProps {
  data: { title: string };
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
  handleSave: () => void;
}

const Title: React.FC<TitleProps> = ({ data, setData, handleSave }) => {
  return (
    <ReactTextareaAutosize
      placeholder="Title"
      value={data.title}
      autoFocus
      required
      onChange={(e) => {
        setData((prevData) => ({ ...prevData, title: e.target.value }));
      }}
      onBlur={handleSave}
      className="text-2xl md:text-3xl w-full bg-transparent resize-none focus:outline-none"
    />
  );
};

export default Title;
