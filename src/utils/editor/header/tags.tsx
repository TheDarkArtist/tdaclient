"use client";
import { Article, Project } from "@prisma/client";
import React, { useState } from "react";
import { MdClose, MdOutlineAddCircle } from "react-icons/md";

interface TagsProps {
  data: Article | Project;
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
}

const Tags: React.FC<TagsProps> = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(data.tags || []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newTag = inputValue.trim();
      const newTags = [...tags, newTag];
      setTags(newTags);
      setData((prev) => ({
        ...prev,
        tags: newTags,
      }));
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setData((prev) => ({
      ...prev,
      tags: updatedTags,
    }));
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex dark:bg-zinc-600 bg-gray-300 dark:hover:bg-zinc-700 hover:bg-white dark:active:bg-zinc-800 active:bg-gray-200 rounded-md px-2 py-.5 items-center gap-1"
      >
        <MdOutlineAddCircle />
        <span>tags</span>
      </button>
      <div
        className={`absolute flex flex-col top-10 md:left-24 rounded-2xl w-[19.2rem] overflow-hidden dark:bg-zinc-800 bg-stone-200 dark:border-stone-600 border-stone-300 shadow-lg dark:shadow-stone-600/50 shadow-stone-400 ${open ? "h-96 p-4 border" : "h-0"} transition-all ease-in-out`}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-4 top-4"
        >
          <MdClose className="h-5 w-5" />
        </button>
        <div className="font-bold text-xl">Add Relevant Tags</div>
        <div className="h-full">
          <div id="editor-tags" className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="flex gap-1 items-center bg-gray-200 h-min dark:bg-zinc-600 rounded-lg px-2 py-1 text-sm"
              >
                {tag}
                <MdClose
                  onClick={() => handleRemoveTag(tag)}
                  className="cursor-pointer"
                />
              </span>
            ))}
          </div>
        </div>
        <input
          type="text"
          className="p-2 rounded-xl focus:outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </>
  );
};

export default Tags;
