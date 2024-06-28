import React from "react";
import { _getDrafts } from "@/lib/actions/articles";
import { Article } from "@prisma/client";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { revalidateTag } from "next/cache";

const DraftArticlesCount = async () => {
  const session = await getSession();
  const articles: Article[] = [];
  const projects = (await _getDrafts()) as Article[];
  revalidateTag('projects')
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  return (
    <Link
      href={"articles/drafts"}
      className="dark:bg-zinc-900 bg-stone-300 p-2 w-full rounded-md cursor-pointer hover:border-red-600"
    >
      <h2>Drafts</h2>
      <p className="font-bold text-cyan-600 text-2xl">{articles.length}</p>
    </Link>
  );
};

export default DraftArticlesCount;
