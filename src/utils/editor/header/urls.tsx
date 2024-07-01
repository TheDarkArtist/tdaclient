"use client";
import { Article, Project } from "@prisma/client";
import React, { useState } from "react";
import { MdClose, MdOutlineAddCircle } from "react-icons/md";

interface UrlProps {
  data: Project | Article;
  setData: React.Dispatch<React.SetStateAction<Article | Project>>;
}

const Urls: React.FC<UrlProps> = ({ data, setData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex dark:bg-zinc-600 bg-gray-300 dark:hover:bg-zinc-700 hover:bg-white dark:active:bg-zinc-800 active:bg-gray-200 rounded-md px-2 py-.5 items-center gap-1"
      >
        <MdOutlineAddCircle />
        <span>urls</span>
      </button>
      <div
        className={`absolute flex flex-col gap-2 top-10 md:left-44 rounded-2xl w-[19.2rem] overflow-hidden dark:bg-zinc-800 bg-stone-200 dark:border-stone-600 border-stone-300 shadow-lg dark:shadow-stone-600/50 shadow-stone-400 ${open ? "h-40 p-4 border" : "h-0"} transition-all ease-in-out`}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-4 top-4"
        >
          <MdClose className="h-5 w-5" />
        </button>
        <div className="font-bold text-xl">Add Urls</div>
        <input
          type="text"
          className="p-2 rounded-xl focus:outline-none"
          placeholder="Repository Link"
          value={(data as Project).repo as string}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              repo: e.target.value,
            }))
          }
        />
        <input
          type="text"
          className="p-2 rounded-xl focus:outline-none"
          placeholder="External Link"
          value={(data as Project).link as string}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              link: e.target.value,
            }))
          }
        />
      </div>
    </>
  );
};

export default Urls;
