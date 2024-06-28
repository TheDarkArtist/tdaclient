import React from "react";
import AsrticleStats from "./article-stats";
import Activities from "./activities";

const ArticleHomeSidebar = () => {
  return (
    <div className="hidden fixed md:flex flex-col h-full gap-4 w-full max-w-[20rem]">
      <div className="h-min space-y-4 rounded-md dark:bg-black bg-white">
        <AsrticleStats />
        <Activities />
      </div>
    </div>
  );
};

export default ArticleHomeSidebar;
