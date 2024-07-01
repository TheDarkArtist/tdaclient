import React from "react";
import ProjectStats from "./project-stats";
import { getSession } from "@/lib/auth";

const ProjectHomeSidebar = async () => {
  const session = await getSession();

  if (!session || session.user.access != "root") {
    return;
  }

  return (
    <div className="hidden md:flex flex-col gap-4 w-full max-w-sm mx-4">
      <ProjectStats />
    </div>
  );
};

export default ProjectHomeSidebar;
