import React from "react";
import { _filteredArticles } from "@/lib/actions/articles";
import { revalidateTag } from "next/cache";
import { Project } from "@prisma/client";
import { ProjectCard } from "./project-card";
import { _filteredProjects } from "@/lib/actions/projects";

const FilteredProjectList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const projects = (await _filteredProjects(query)) as Project[];
  revalidateTag("projects");
  return (
    <div className="grid gap-4 md:grid-cols-2 ">
      {projects.map((data) => (
        <ProjectCard key={data.id} data={data} />
      ))}
    </div>
  );
};

export default FilteredProjectList;
