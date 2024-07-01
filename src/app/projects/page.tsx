import AllProjectList from "@/ui/projects/all-project-list";
import FilteredProjectList from "@/ui/projects/filtered-project-list";
import { ProjectCreateBtn } from "@/ui/projects/project-create-btn";
import ProjectHomeSidebar from "@/ui/projects/project-home-sidebar";
import { ProjectSearch } from "@/ui/projects/project-search";
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
    <div className="flex pb-10 justify-center p-4 gap-4 min-h-full w-full pt-24 dark:bg-grid-cyan-600/[0.2] bg-grid-black/[0.1]">
      <div className="w-full md:max-w-[60rem]">
        <div className="pb-4">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={2200}
            className="absolute md:h-20 h-10 md:w-80 w-40"
            particleColor="#075985"
          />
          <h1 className="md:text-4xl text-3xl text-sky-800 font-bold">
            My Projects
          </h1>
          <TextGenerateEffect
            className="font-normal leading-normal"
            words="This is my personal space where I showcase my self-developed projects and blog about my private coding adventures. It’s updated when I feel like posting bigger news to the world, for more frequent and smaller updates, follow me on Instagram or X. All of my public source are available over at my github repository."
          />
        </div>
        <div className="flex flex-wrap-reverse gap-4 justify-end items-center my-4 w-full">
          <div className="w-full max-w-[38rem]">
            <ProjectSearch />
          </div>
          <ProjectCreateBtn />
        </div>
        <Suspense key={query + currentPage} fallback={<div>Searching...</div>}>
          <FilteredProjectList query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <ProjectHomeSidebar />
    </div>
  );
};

export default page;
