import React from "react";
import Editor from "./editor";
import { _getOne } from "@/lib/actions/articles";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Article, Project } from "@prisma/client";

const TDAEditor = async ({ params }: { params: Params }) => {
  const article = await _getOne(params.id);
  return <Editor post={article as Article | Project} />;
};

export default TDAEditor;
