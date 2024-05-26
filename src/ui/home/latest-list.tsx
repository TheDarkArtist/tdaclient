import React from "react";
import { BackgroundGradient } from "@/ui/utils/bg-gradient-card";
import { _latestArticles } from "@/lib/actions/articles";
import { _latestProjects } from "@/lib/actions/projects";
import { Article, Project } from "@prisma/client";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

interface LatestListProps {
  data: (Project | Article)[];
  title: string;
  tda?: boolean;
  description?: string;
}

const LatestList: React.FC<LatestListProps> = async ({
  data,
  title,
  tda,
  description,
}) => {
  return (
    <BackgroundGradient className="">
      <div className="dark:bg-black bg-white/[.8] p-4 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="mb-4">{description}</p>
        <ul className="list-disc ml-6">
          {data.map((item) => (
            <li className="hover:text-cyan-600" key={item.id}>
              <Link
                href={`${tda ? "/projects" : "/articles"}` + item.id}
                key={item.id}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="flex items-center gap-2 text-cyan-800 group justify-end mt-4"
          href={tda ? "/projects" : "/articles"}
        >
          <span className="hover:text-cyan-600 cursor-pointer">
            All {tda ? "Projects" : "Articles"}
          </span>
          <LuMoveRight className="group-hover:text-cyan-600" />
        </Link>
      </div>
    </BackgroundGradient>
  );
};

export default LatestList;
