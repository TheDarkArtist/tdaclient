import React from "react";
import { _latestArticles } from "@/lib/actions/articles";
import { _latestProjects } from "@/lib/actions/projects";
import Link from "next/link";
import { LuMoveRight } from "react-icons/lu";

interface LatestListProps {
  title: string;
  tda?: boolean;
  limit?: number;
  description?: string;
}

const LatestList: React.FC<LatestListProps> = async ({
  title,
  tda,
  limit,
  description,
}) => {
  const articles = await _latestArticles(limit);
  const projects = await _latestProjects(limit);
  return (
    <div className="border dark:border-white/[.2] dark:bg-black bg-white rounded-xl">
      <h1 className="border-b dark:border-white/[.2] px-4 py-2 text-2xl font-bold mb-2">
        {title}
      </h1>
      <p className="mb-4">{description}</p>
      <ul className="list-disc px-4 py-2 ml-6">
        {(tda ? projects : articles).map((item) => (
          <li className="text-cyan-600 hover:text-cyan-400" key={item.id}>
            <Link
              href={`${tda ? "/projects/" : "/articles/"}` + item.id}
              key={item.id}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end items-center px-4 py-2 border-t border-white/[.2]">
        <Link
          className="inline-flex items-center gap-2 cursor-pointer text-cyan-800 hover:text-cyan-600"
          href={tda ? "/projects" : "/articles"}
        >
          <span>All {tda ? "Projects" : "Articles"}</span>
          <LuMoveRight />
        </Link>
      </div>
    </div>
  );
};

export default LatestList;
