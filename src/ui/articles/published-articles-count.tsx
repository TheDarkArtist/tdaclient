import { _getPublished } from "@/lib/actions/articles";
import { getSession } from "@/lib/auth";
import { Article } from "@prisma/client";
import Link from "next/link";
import React from "react";

const PublishedArticlesCount = async () => {
  const session = await getSession();
  const articles: Article[] = [];
  const projects = (await _getPublished()) as Article[];
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  return (
    <Link
      href={"/articles/published"}
      className="dark:bg-zinc-900 bg-stone-300 p-2 w-full rounded-md"
    >
      <h2>Published</h2>
      <p className="font-bold text-cyan-600 text-2xl">{articles.length}</p>
    </Link>
  );
};

export default PublishedArticlesCount;
