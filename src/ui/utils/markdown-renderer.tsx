import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.min.css";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      className={"space-y-5"}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-bold" />;
        },
        h2: ({ node, ...props }) => {
          return <h1 {...props} className="text-2xl font-bold" />;
        },
        h3: ({ node, ...props }) => {
          return <h1 {...props} className="text-xl font-bold" />;
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
