import React from "react";
import MarkdownRenderer from "@/ui/utils/markdown-renderer";
import { _getOne } from "@/lib/actions/articles";

const Body = async ({ id }: { id: string }) => {
  const content = await _getOne(id);
  return (
    <div className="w-full dark:text-gray-300 dark:bg-[#111111] bg-white p-4 overflow-hidden rounded-b-md">
      <MarkdownRenderer content={content?.body as string} />
    </div>
  );
};

export default Body;
