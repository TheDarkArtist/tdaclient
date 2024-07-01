import MarkdownRenderer from "@/ui/utils/markdown-renderer";
import React from "react";

const Preview = ({ data }: { data: string }) => {
  return (
    <div className="md:w-1/2 mt-10">
      <div className="p-4">
        <MarkdownRenderer content={data} />
      </div>
    </div>
  );
};

export default Preview;
