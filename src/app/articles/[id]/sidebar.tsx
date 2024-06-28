import { _getOne } from "@/lib/actions/articles";
import TOC from "@/utils/table-of-contents";
import React from "react";

const Sidebar = async ({ id }: { id: string }) => {
  const article = await _getOne(id);
  return (
    <div className="relative max-w-[20rem] w-full hidden md:block">
      <TOC content={article?.body || ""} navbarHeight={68} />
    </div>
  );
};

export default Sidebar;
