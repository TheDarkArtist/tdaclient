"use client";
import React, { useCallback, useEffect, useState } from "react";
import { _update as _updateArticle } from "@/lib/actions/articles";
import { _update as _updateProject } from "@/lib/actions/projects";
import { Article, Project } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import ShowLink from "./show-link";
import SavedBtn from "./saved-btn";
import PublishBtn from "./publish-btn";
import DiscardBtn from "./discard-btn";
import Title from "./title";
import Description from "./desc";
import Body from "./body";

type EditorProps = {
  post: Article | Project;
};

const Editor: React.FC<EditorProps> = ({ post }) => {
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
      // Add error handling logic here
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
    <>
      <div className="my-4">
        <div className="pl-2 dark:text-red-900 text-gray-400 font-extrabold text-3xl">
          Markdown Editor
        </div>
      </div>
      <div className="md:p-4 p-4 border dark:border-stone-600 border-stone-300 rounded-md shadow-lg dak:shadow-lg">
        <div className="flex flex-wrap w-full md:justify-between justify-end items-center mb-8 space-x-3">
          <div className="dark:text-stone-500 text-stone-500">
            Note: Your Post Will AutoSave, To Manually Save Press (Ctrl + S)
          </div>
          <div className="flex gap-2 pt-2">
            <ShowLink id={data.id} published={data.published} />
            <SavedBtn isPendingSaving={isPendingSaving} />
            <PublishBtn
              id={data.id}
              published={data.published}
              setData={setData}
            />
            <DiscardBtn id={data.id} published={data.published} />
          </div>
        </div>
        <div className="space-y-2">
          <Title data={data} setData={setData} handleSave={handleSave} />
          <Description data={data} setData={setData} handleSave={handleSave} />
          <div className="border-t dark:border-stone-800 pb-6 w-full" />
          <Body data={data} setData={setData} handleSave={handleSave} />
        </div>
      </div>
    </>
  );
};

export default Editor;
