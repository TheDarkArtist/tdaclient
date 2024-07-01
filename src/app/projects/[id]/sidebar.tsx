import { _getOne } from "@/lib/actions/projects";
import TOC from "@/utils/table-of-contents";
import React from "react";

const Sidebar = async ({ id }: { id: string }) => {
  const project = await _getOne(id);
  return (
    <div className="relative max-w-[20rem] w-full hidden md:block">
      <TOC content={project?.body || ""} navbarHeight={68} />
    </div>
  );
};

export default Sidebar;
