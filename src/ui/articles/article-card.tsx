"use client";
import React from "react";
import { Article } from "@prisma/client";
import ArticleTag from "./article-tag";

export function ArticleCard({ data }: { data: Article }) {
  return (
    <div className="inter-va h-full relative">
      <div className="bg-gray-200 relative cursor-pointer group/card  dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.1] dark:bg-grid-cyan-600/[.2] dark:bg-black dark:border-white/[0.2] border-stone-600/[0.2] h-full w-full rounded-xl md:px-6 md:pt-10 p-3 border  hover:scale-[1.02] transition-all ease-in-out duration-200">
        <div
          className={`text-2xl font-bold text-neutral-600 w-full dark:text-sky-600`}
        >
          {data.title}
        </div>
        <div className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 break-words">
          {data && data.description?.substring(0, 280)}
          {data.description && data.description[280] && "..."}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-wrap py-2 rounded-xl text-xs font-normal gap-2 dark:text-white">
            <ArticleTag tag="AI" />
            <ArticleTag tag="Robots" />
            <ArticleTag tag="War" />
          </div>
        </div>
      </div>
    </div>
  );
}
