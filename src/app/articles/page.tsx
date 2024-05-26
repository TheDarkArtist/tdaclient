import { _getAll } from "@/lib/actions/articles";
import { ArticleCard } from "@/ui/articles/article-card";
import { ArticleCreateBtn } from "@/ui/articles/article-create-btn";
import ArticleHomeSidebar from "@/ui/articles/article-home-sidebar";
import { ArticleSearch } from "@/ui/articles/article-search";
import { SparklesCore } from "@/ui/utils/sparkles";
import { TextGenerateEffect } from "@/ui/utils/text-generate-effect";
import Link from "next/link";
import React from "react";

const page = async () => {
  const projects = await _getAll();
  return (
    <div className="flex justify-center p-4 gap-4 min-w-full pt-24 dark:bg-dot-cyan-600/[0.4] bg-grid-black/[0.1] overflow-hidden">
      <div className="w-full md:max-w-[60rem]">
        <div className="pb-4">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={2200}
            className="absolute md:h-20 h-10 md:w-80 w-40"
            particleColor="#166534"
          />
          <h1 className="md:text-4xl text-3xl dark:text-green-800 font-bold">
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
            more, I hope you guys will do the same."
          />
        </div>
        <ArticleSearch />
        <div className="flex justify-end my-4 w-full">
          <ArticleCreateBtn />
        </div>
        <div className="grid gap-4 md:grid-cols-1 ">
          {projects.map((data) => (
            <Link key={data.id} href={`/articles/${data.id}`}>
              <ArticleCard key={data.id} data={data} />
            </Link>
          ))}
        </div>
      </div>
      <ArticleHomeSidebar />
    </div>
  );
};

export default page;
