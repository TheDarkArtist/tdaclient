import Link from "next/link";
import React from "react";

const MyResume = ({
  download,
  preview,
}: {
  download: string;
  preview: string;
}) => {
  return (
    <div className="border border-white/[.2] dark:bg-black rounded-xl">
      <div className="border-b border-white/[.2] px-4 py-2">My Resume</div>
      <div className="px-4 space-x-4 py-2">
        <Link
          className="text-cyan-600 hover:text-cyan-400"
          href={preview || ""}
        >
          Preview
        </Link>
        <Link
          className="text-cyan-600 hover:text-cyan-400"
          href={download || ""}
        >
          Download
        </Link>
      </div>
    </div>
  );
};

export default MyResume;
