import React from "react";
import { _getDrafts } from "@/lib/actions/projects";
import { Project } from "@prisma/client";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

const DraftProjectCount = async () => {
  const session = await getSession();
  const articles: Project[] = [];
  const projects = (await _getDrafts()) as Project[];
  revalidateTag("projects");
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  return (
    <Link
      href={"projects/drafts"}
      className="dark:bg-zinc-900 bg-stone-300 p-2 w-full rounded-md cursor-pointer hover:border-red-600"
    >
      <h2>Drafts</h2>
      <p className="font-bold text-cyan-600 text-2xl">{articles.length}</p>
    </Link>
  );
};

export default DraftProjectCount;
