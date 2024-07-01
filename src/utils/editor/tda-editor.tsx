import React from "react";
import Editor from "./editor";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Article, Project } from "@prisma/client";
import { _getOne as getOneArticle } from "@/lib/actions/articles";
import { _getOne as getOneProject } from "@/lib/actions/projects";

const TDAEditor = async ({
  params,
  source,
}: {
  params: Params;
  source: string;
}) => {
  let post: Project | Article | null = null;

  if (source === "projects" || source === "up") {
    post = (await getOneProject(params.id)) as Project;
  } else if (source === "articles" || source === "ua") {
    post = (await getOneArticle(params.id)) as Article;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Editor post={post} />
    </div>
  );
};

export default TDAEditor;
