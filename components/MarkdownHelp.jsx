"use client";

import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const MarkdownHelp = () => {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div
      id="md-help"
      className="w-full my-2 bg-[#0D1116] p-4 border border-stone-800 mb-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl underline">Markdown Guide</h2>
        <span onClick={handleExpand}>
          {!expand ? (
            <MdExpandMore className="cursor-pointer h-8 w-8" />
          ) : (
            <MdExpandLess className="cursor-pointer h-8 w-8" />
          )}
        </span>
      </div>
      <div className={`${!expand && "hidden"}`}>
        <p>
          <strong>Headers:</strong> Use hashtags (#) for headers.
        </p>
        <p>
          <strong>Text Formatting:</strong> Use asterisks or underscores for
          emphasis.
        </p>
        <p>
          <strong>Lists:</strong> Use dashes, asterisks, or numbers for lists.
        </p>
        <p>
          <strong>Links:</strong> Use square brackets for links.
        </p>
        <p>
          <strong>Images:</strong> Use exclamation marks for images.
        </p>
        <p>
          <strong>Blockquotes:</strong> Use greater-than signs for blockquotes.
        </p>
        <p>
          <strong>Code:</strong> Use backticks for inline code and fenced code
          blocks for multiline code.
        </p>
        <p>
          <strong>Horizontal Rule:</strong> Use hyphens, asterisks, or
          underscores.
        </p>
        <p>
          <strong>Escaping Characters:</strong> Use backslashes to escape
          special characters.
        </p>
        <p>
          <strong>Tables:</strong> Create tables using pipes and hyphens.
        </p>
        <p>
          <strong>New lines:</strong> Create new lines using backslashes at the
          end of line.
        </p>
      </div>
    </div>
  );
};

export default MarkdownHelp;
