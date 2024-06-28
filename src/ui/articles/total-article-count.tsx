import { _getAll } from "@/lib/actions/articles";
import { getSession } from "@/lib/auth";
import { Article } from "@prisma/client";
import Link from "next/link";
import React from "react";

const TotalArticlesCount = async () => {
  const session = await getSession();
  const articles: Article[] = [];
  const projects = (await _getAll()) as Article[];
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  return (
    <div
      className="dark:bg-zinc-900 bg-stone-300 p-2 w-full rounded-md"
    >
      <h2>Total</h2>
      <p className="font-bold text-cyan-600 text-2xl">{articles.length}</p>
    </div>
  );
};

export default TotalArticlesCount;
