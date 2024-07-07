import React from "react";
import MarkdownRenderer from "@/ui/utils/markdown-renderer";
import { _getOne } from "@/lib/actions/projects";

const Body = async ({ id }: { id: string }) => {
  const content = await _getOne(id);
  return (
    <div className="w-full dark:text-gray-300 leading-relaxed dark:bg-[#111111] bg-white p-4 overflow-hidden rounded-b-md">
      <MarkdownRenderer content={content?.body as string} />
    </div>
  );
};

export default Body;
