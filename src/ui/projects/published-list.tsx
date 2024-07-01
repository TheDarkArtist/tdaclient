import React from "react";
import { _getPublished } from "@/lib/actions/projects";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { ProjectCard } from "./project-card";
import { Project } from "@prisma/client";

const PublishedProjectList = async () => {
  const projects = (await _getPublished()) as Project[];
  revalidateTag("projects");
  return (
    <div className="grid gap-4 md:grid-cols-1 ">
      {projects.map((data) => (
        <Link key={data.id} href={`/projects/${data.id}`}>
          <ProjectCard key={data.id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default PublishedProjectList;
