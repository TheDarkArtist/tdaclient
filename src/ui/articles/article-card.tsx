"use client";
import React from "react";
import { Article } from "@prisma/client";
import ArticleTag from "./article-tag";
import { LuEye } from "react-icons/lu";
import { _incView } from "@/lib/actions/articles";
import { getSession, useSession } from "next-auth/react";

export function ArticleCard({ data }: { data: Article }) {
  const session = useSession();
  return (
    <div
      onClick={() => {
        if (session.status !== "authenticated") {
          _incView(data.id, "unknown");
        } else _incView(data.id, session.data?.user.id as string);
      }}
      className="inter-va h-full relative"
    >
      <div className="bg-white relative cursor-pointer group/card  dark:hover:shadow-2xl dark:hover:shadow-cyan-500/[0.1] bg-grid-sky-600/[.1] dark:bg-grid-green-600/[.1] dark:bg-black dark:border-sky-600/[0.4] border-sky-600/[0.4] h-full w-full rounded-xl md:px-6 md:pt-10 p-3 border  hover:scale-[1.02] transition-all ease-in-out duration-200">
        <div className="flex justify-between items-center absolute top-3">
          <div className="flex items-center space-x-1">
            <LuEye className="h-5 w-5" />
            <span>{data.views.length}</span>
          </div>
          <div></div>
        </div>
        <div
          className={`text-2xl font-bold text-sky-600 w-full dark:text-sky-600`}
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
