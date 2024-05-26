import React from "react";
import MarkdownRenderer from "@/ui/utils/markdown-renderer";

const Preview = ({ body }: { body: string }) => {
  return (
    <div>
      <MarkdownRenderer content={body} />
    </div>
  );
};

export default Preview;
