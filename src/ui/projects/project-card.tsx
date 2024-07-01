"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/ui/utils/3d-card";
import { Project } from "@prisma/client";
import ProjectTag from "./project-tag";
import { LuExternalLink, LuEye, LuGithub, LuLink } from "react-icons/lu";
import Link from "next/link";
import { _incView } from "@/lib/actions/projects";
import { useSession } from "next-auth/react";

export function ProjectCard({ data }: { data: Project }) {
  const session = useSession();
  return (
    <CardContainer className="inter-va h-full" containerClassName="h-full">
      <CardBody className="bg-white relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-stone-600/[0.2] h-full w-full rounded-xl md:px-6 pt-10 pb-4 px-3 border">
        <CardItem
          translateZ="50"
          className={`absolute flex justify-between w-full top-3 left-0 md:px-6 px-4 font-bold text-neutral-600 dark:text-sky-600`}
        >
          <div className="flex items-center gap-1 text-sky-600">
            <LuEye className="h-5 w-5 text-sky-600" />
            <span>{data.views.length}</span>
          </div>
          <div className="flex gap-2 items-center text-sky-600">
            <LuGithub className="h-6 w-6 cursor-pointer hover:border border-sky-600 border-dotted" />
            <LuExternalLink className="h-6 w-6 cursor-pointer hover:border border-sky-600 border-dotted" />
          </div>
        </CardItem>
        <CardItem
          translateZ="50"
          className={`text-3xl font-bold text-green-600`}
        >
          <Link
            onClick={() => {
              if (session.status !== "authenticated") {
                _incView(data.id, "unknown");
              } else _incView(data.id, session.data?.user.id as string);
            }}
            href={`/projects/${data.id}`}
          >
            {data.title}
          </Link>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="hidden md:block text-neutral-500 break-all text-sm max-w-sm dark:text-neutral-300"
        >
          <Link
            onClick={() => {
              if (session.status !== "authenticated") {
                _incView(data.id, "unknown");
              } else _incView(data.id, session.data?.user.id as string);
            }}
            href={`/projects/${data.id}`}
          >
            {data && data.description?.substring(0, 200)}
            {data.description && data.description[200] && "..."}
          </Link>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="md:hidden text-neutral-500 break-all text-sm max-w-sm mt-1 dark:text-neutral-300"
        >
          <Link
            onClick={() => {
              if (session.status !== "authenticated") {
                _incView(data.id, "unknown");
              } else _incView(data.id, session.data?.user.id as string);
            }}
            href={`/projects/${data.id}`}
          >
            {data && data.description?.substring(0, 133)}
            {data.description && data.description[133] && "..."}
          </Link>
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            className="flex flex-wrap rounded-xl text-xs font-normal gap-2 dark:text-white"
          >
            {data.tags.map((tag) => (
              <ProjectTag key={tag} tag={tag} />
            ))}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
