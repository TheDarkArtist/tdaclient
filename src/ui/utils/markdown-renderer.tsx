import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import "highlight.js/styles/atom-one-dark.min.css";
import "katex/dist/katex.min.css"; // Import KaTeX CSS
import "highlight.js/styles/atom-one-dark.min.css";
import Link from "next/link";
import { table } from "console";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      className={"space-y-5"}
      rehypePlugins={[
        rehypeHighlight,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
      ]}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        h1: ({ node, ...props }) => {
          return <h1 {...props} className="text-4xl font-bold" />;
        },
        h2: ({ node, ...props }) => {
          return <h1 {...props} className="text-3xl font-bold" />;
        },
        h3: ({ node, ...props }) => {
          return <h1 {...props} className="text-2xl font-bold" />;
        },
        h4: ({ node, ...props }) => {
          return <h1 {...props} className="text-xl font-bold" />;
        },
        h5: ({ node, ...props }) => {
          return <h1 {...props} className="text-lg font-bold" />;
        },
        h6: ({ node, ...props }) => {
          return <h1 {...props} className="text-md font-bold" />;
        },
        p: ({ node, ...props }) => {
          return <p {...props} className=""></p>;
        },
        ol: ({ node, ...props }) => {
          return <ol {...props} className="list-decimal ml-6" />;
        },
        ul: ({ node, ...props }) => {
          return <ul {...props} className="list-disc ml-6" />;
        },
        a: ({ node, ...props }) => {
          return <a {...props} className="text-sky-600 hover:text-blue-600" />;
        },
        pre: ({ node, ...props }) => {
          return <pre {...props} className="" />;
        },
        code: ({ node, ...props }) => {
          return (
            <pre className="overflow-x-scroll scroll-smooth no-scrollbar">
              <code {...props} className="" />
            </pre>
          );
        },
        table: ({ node, ...props }) => {
          return <table {...props} className="" />;
        },
        thead: ({ node, ...props }) => {
          return <thead {...props} className="" />;
        },
        tbody: ({ node, ...props }) => {
          return <tbody {...props} className="" />;
        },
        th: ({ node, ...props }) => {
          return (
            <td
              {...props}
              className="border border-sky-600 font-bold dark:text-green-600 p-2"
            />
          );
        },
        td: ({ node, ...props }) => {
          return (
            <td
              {...props}
              className="border border-sky-600 p-2 dark:text-sky-400"
            />
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownRenderer;
