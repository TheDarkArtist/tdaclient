import React from "react";
import { _getDrafts } from "@/lib/actions/articles";
import { ArticleCard } from "@/ui/articles/article-card";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Article } from "@prisma/client";
import { getSession } from "@/lib/auth";

const DraftArticleList = async () => {
  const session = await getSession();
  const articles: Article[] = [];
  const projects = (await _getDrafts()) as Article[];
  projects.map((article) => {
    if (article.userId === session?.user.id) {
      articles.push(article);
    }
  });
  revalidateTag("projects");
  return (
    <div className="grid gap-4 md:grid-cols-1 ">
      {articles.map((data) => (
        <Link key={data.id} href={`/articles/${data.id}`}>
          <ArticleCard key={data.id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default DraftArticleList;
