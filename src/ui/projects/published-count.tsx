import { _getPublished } from "@/lib/actions/projects";
import { getSession } from "@/lib/auth";
import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";

const PublishedProjectCount = async () => {
  const session = await getSession();
  const articles: Project[] = [];
  const projects = (await _getPublished()) as Project[];
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  return (
    <Link
      href={"/projects/published"}
      className="dark:bg-zinc-900 bg-stone-300 p-2 w-full rounded-md"
    >
      <h2>Published</h2>
      <p className="font-bold text-cyan-600 text-2xl">{articles.length}</p>
    </Link>
  );
};

export default PublishedProjectCount;
