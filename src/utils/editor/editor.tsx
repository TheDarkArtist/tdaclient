"use client";

import React, { useCallback, useEffect, useState } from "react";
import Header from "./header/header";
import Footer from "./footer";
import Preview from "./preview";
import Body from "./body";
import { _update as _updateArticle } from "@/lib/actions/articles";
import { _update as _updateProject } from "@/lib/actions/projects";
import { _getOne } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";

const Editor = ({ post }: { post: Article | Project }) => {
  const [data, setData] = useState<Article | Project>(post);
  const [isPendingSaving, setIsPendingSaving] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const handleSave = useCallback(async () => {
    setIsPendingSaving(true);
    try {
      const source = searchParams.get("source");
      if (source === "articles" || source === "ua") {
        await _updateArticle(data as Article);
      } else if (source === "projects" || source === "up") {
        await _updateProject(data as Project);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setIsPendingSaving(false);
    }
  }, [data, searchParams]);

  const handleKeyboardShortcut = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    },
    [handleSave]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardShortcut);
    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, [data, searchParams, handleKeyboardShortcut]);

  return (
    <div className="flex relative flex-col min-h-full dark:bg-[#111111]">
      <Header data={data} setData={setData} isPendingSave={isPendingSaving} />
      <div className="absolute w-full flex min-h-full">
        <Body setData={setData} handleSave={handleSave} post={post} />
        <div className="border-4 dark:border-stone-800" />
        <Preview data={data.body} />
      </div>
      <Footer data={data.body} />
    </div>
  );
};

export default Editor;
