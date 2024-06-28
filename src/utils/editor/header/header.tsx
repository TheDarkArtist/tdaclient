import { _delete, _update } from "@/lib/actions/articles";
import React from "react";
import { Article, Project } from "@prisma/client";
import { extractFirstHeading } from "../../get-heading";
import { extractFirstParagraph } from "../../get-paragraph";
import Publish from "./publish";
import Save from "./save";
import Delete from "./delete";
import Back from "./back";
import Tags from "./tags";

const Header = ({
  setData,
  data,
  isPendingSave,
}: {
  data: Article | Project;
  isPendingSave: boolean;
}) => {
  data.title = extractFirstHeading(data.body as string)?.text as string;
  data.description = extractFirstParagraph(data.body as string);
  return (
    <div className="fixed flex justify-between items-center z-10 w-full p-2 border-b dark:border-stone-700 border-stone-400 dark:bg-zinc-800 bg-stone-200">
      <div className="flex relative gap-4 items-center">
        <h1>TDAEditor</h1>
        <Tags data={data} setData={setData} />
      </div>
      <div className="flex items-center gap-4">
        <Publish data={data} />
        <Save data={data} isPendingSave={isPendingSave} />
        <Delete />
        <Back data={data} />
      </div>
    </div>
  );
};

export default Header;
