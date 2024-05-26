"use client";

import React, { useRef, useState, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { Source_Code_Pro } from "next/font/google";

const scp = Source_Code_Pro({ subsets: ["latin"] });

const MarkdownEditor = ({ desc, setDesc }) => {
  const [preview, setPreview] = useState(false);

  return (
    <div className="border border-zinc-800 bg-zinc-950 w-full rounded-md ">
      <menu className="flex space-x-2 p-1 border-b border-stone-800">
        <span
          onClick={() => {
            setPreview(false);
          }}
          className="bg-zinc-800 hover:bg-zinc-900 px-2 py-0.5 w-20 text-center  border-black rounded-sm cursor-pointer"
        >
          Write
        </span>
        <span
          onClick={() => setPreview(true)}
          className="bg-zinc-800 hover:bg-zinc-900 px-2 py-0.5 w-20 text-center rounded-sm cursor-pointer"
        >
          Preview
        </span>
      </menu>
      {!preview ? (
        <div className="flex">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={`pb-[20rem]  bg-neutral-900 w-full p-2 resize-none focus:outline-none ${scp.className}`}
          ></textarea>
        </div>
      ) : (
        <div className="p-4 min-h-[24rem] bg-[#000001]">
          <MarkdownRenderer content={desc} />
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
