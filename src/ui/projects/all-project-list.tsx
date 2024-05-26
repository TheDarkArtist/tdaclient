import React from "react";
import Link from "next/link";
import { ProjectCard } from "./project-card";
import { _getAll } from "@/lib/actions/projects";
import { revalidateTag } from "next/cache";

const AllProjectList = async () => {
  const projects = await _getAll();
  revalidateTag('projects')
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((data) => (
        <Link key={data.id} href={`/projects/${data.id}`}>
          <ProjectCard key={data.id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default AllProjectList;
