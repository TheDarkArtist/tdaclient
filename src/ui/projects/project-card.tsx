"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/ui/utils/3d-card";
import { Project } from "@prisma/client";
import ProjectTag from "./project-tag";

export function ProjectCard({ data }: { data: Project }) {
  return (
    <CardContainer className="inter-va h-full" containerClassName="h-full">
      <CardBody className="bg-gray-200 relative cursor-pointer group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-stone-600/[0.2] h-full w-full rounded-xl md:p-6 p-3 border  ">
        <CardItem
          translateZ="50"
          className={`text-3xl font-bold text-neutral-600 dark:text-green-600`}
        >
          {data.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 break-all text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {data && data.description?.substring(0, 200)}
          {data.description && data.description[200] && "..."}
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            className="flex flex-wrap py-2 rounded-xl text-xs font-normal gap-2 dark:text-white"
          >
            <ProjectTag tag="python" />
            <ProjectTag tag="Django" />
            <ProjectTag tag="java" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
