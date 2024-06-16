"use client";

import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Preview from "./preview";
import Body from "./body";
import { _getOne } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";

const Editor = ({ post }: { post: Article | Project }) => {
  const [data, setData] = useState(() => {
    return {
      ...post,
    };
  });
  console.log(data);
  return (
    <div className="flex relative flex-col min-h-full dark:bg-[#111111]">
      <Header data={data} />
      <div className="absolute w-full flex min-h-full">
        <Body setData={setData} post={post} />
        <div className="border-4 dark:border-stone-800" />
        <Preview data={data.body} />
      </div>
      <Footer data={data.body} />
    </div>
  );
};

export default Editor;
