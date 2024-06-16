import { Article, Project } from "@prisma/client";
import React from "react";
import { LuInfo } from "react-icons/lu";

const Footer = ({ data }: { data: string }) => {
  return (
    <div className="fixed flex space-x-4 justify-between text-sm w-full bottom-0 py-0.5 px-4 text-white bg-sky-700">
      <div className="flex space-x-4">
        <div>Markdown</div>
        <div>{data.length} bytes</div>
        <div>{data.split(" ").length} words</div>
        <div>{data.split("\n").length} lines</div>
      </div>
      <div className="flex space-x-2">
        <p className="font-bold">TDAEditor</p>
        <LuInfo className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
