import { ArticleCreateBtn } from "@/ui/articles/article-create-btn";
import ArticleHomeSidebar from "@/ui/articles/article-home-sidebar";
import { ArticleSearch } from "@/ui/articles/article-search";
import FilteredArticleList from "@/ui/articles/filtered-article-list";
import { SparklesCore } from "@/ui/utils/sparkles";
import { TextGenerateEffect } from "@/ui/utils/text-generate-effect";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="flex justify-center p-4 gap-4 w-full pt-24 dark:bg-dot-cyan-600/[0.4] bg-dot-black/[0.4] overflow-hidden">
      <div className="w-full md:max-w-[60rem]">
        <div className="pb-4 relative">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={2200}
            className="absolute md:h-16 md:-top-5 -top-4 rounded-full md:-left-6 h-16 md:w-72 w-52"
            particleColor="#166534"
          />
          <h1 className="md:text-4xl text-3xl text-green-800 font-bold">
            Read Articles{" "}
          </h1>
          <TextGenerateEffect
            className="font-normal leading-normal"
            words="Welcome to my blogging page, where I share my perspectives,
            insights, and experiences on a wide range of topics, with a focus on
            technology and beyond. Through my blog posts, I aim to offer
            thought-provoking discussions, personal reflections, and
            explorations of emerging trends in areas such as artificial
            intelligence, software development, digital innovation and so much
            more. "
          />
        </div>
        <div className="flex flex-wrap-reverse gap-4 justify-end items-center my-4 w-full">
          <div className="w-full max-w-[38rem]">
            <ArticleSearch />
          </div>
          <ArticleCreateBtn />
        </div>
        <Suspense key={query + currentPage} fallback={<div>Searching...</div>}>
          <FilteredArticleList query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className="hidden md:block relative w-full max-w-[20rem]">
        <ArticleHomeSidebar />
      </div>
    </div>
  );
};

export default page;
