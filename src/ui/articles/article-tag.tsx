import React from "react";

const ArticleTag = ({ tag }: { tag: string }) => {
  return (
    <>
      <span className="hover:animate-bounce relative inline-flex overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex 1-full text-xs w-full cursor-pointer items-center justify-center rounded-md dark:bg-slate-950 bg-gray-300 px-3 py-1 font-medium dark:text-white backdrop-blur-3xl">
          {tag || "lang"}
        </span>
      </span>
    </>
  );
};

export default ArticleTag;
