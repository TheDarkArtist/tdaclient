import { _getAll } from "@/lib/actions/projects";
import { ProjectCard } from "@/ui/projects/project-card";
import { ProjectCreateBtn } from "@/ui/projects/project-create-btn";
import ProjectHomeSidebar from "@/ui/projects/project-home-sidebar";
import { ProjectSearch } from "@/ui/projects/project-search";
import { SparklesCore } from "@/ui/utils/sparkles";
import { TextGenerateEffect } from "@/ui/utils/text-generate-effect";
import Link from "next/link";
import React from "react";

const page = async () => {
  const projects = await _getAll();
  return (
    <div className="absolute flex justify-center p-4 gap-4 min-h-full w-full pt-24 dark:bg-grid-cyan-600/[0.2] bg-grid-black/[0.1]">
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
          <h1 className="md:text-4xl text-3xl dark:text-sky-800 font-bold">
            My Projects
          </h1>
          <TextGenerateEffect
            className="font-normal leading-normal"
            words="This is my personal space where I showcase my self-developed projects and blog about my private coding adventures. It’s updated when I feel like posting bigger news to the world, for more frequent and smaller updates, follow me on Instagram or X. All of my public source are available over at my github repository."
          />
        </div>
        <ProjectSearch />
        <div className="flex justify-end my-4 w-full">
          <ProjectCreateBtn />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((data) => (
            <Link key={data.id} href={`/projects/${data.id}`}>
              <ProjectCard key={data.id} data={data} />
            </Link>
          ))}
        </div>
      </div>
      <ProjectHomeSidebar />
    </div>
  );
};

export default page;
