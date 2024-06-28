import React from "react";
import { _filteredArticles } from "@/lib/actions/articles";
import { ArticleCard } from "@/ui/articles/article-card";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import { Article } from "@prisma/client";

const FilteredArticleList = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const projects = (await _filteredArticles(query)) as Article[];
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

export default FilteredArticleList;
