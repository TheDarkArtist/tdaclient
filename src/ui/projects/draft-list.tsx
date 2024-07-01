import React from "react";
import { _getDrafts } from "@/lib/actions/projects";
import { ProjectCard } from "@/ui/projects/project-card";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Project } from "@prisma/client";
import { getSession } from "@/lib/auth";

const DraftProjectList = async () => {
  const session = await getSession();
  const articles: Project[] = [];
  const projects = (await _getDrafts()) as Project[];
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  revalidateTag("projects");
  return (
    <div className="grid gap-4 md:grid-cols-1 ">
      {articles.map((data) => (
        <Link key={data.id} href={`/projects/${data.id}`}>
          <ProjectCard key={data.id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default DraftProjectList;
