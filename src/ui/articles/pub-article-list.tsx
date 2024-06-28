import React from "react";
import { _getPublished } from "@/lib/actions/articles";
import { ArticleCard } from "@/ui/articles/article-card";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Article } from "@prisma/client";

const PublishedArticleList = async () => {
  const projects = (await _getPublished()) as Article[];
  revalidateTag("projects");
  return (
    <div className="grid gap-4 md:grid-cols-1 ">
      {projects.map((data) => (
        <Link key={data.id} href={`/articles/${data.id}`}>
          <ArticleCard key={data.id} data={data} />
        </Link>
      ))}
    </div>
  );
};

export default PublishedArticleList;
