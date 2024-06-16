import { _delete, _update } from "@/lib/actions/articles";
import React from "react";
import { LuArrowLeft, LuSave, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { Article, Project } from "@prisma/client";
import { extractFirstHeading } from "../get-heading";
import { extractFirstParagraph } from "../get-paragraph";

const Header = ({ data }: { data: Article | Project }) => {
  const params = useParams();
  const router = useRouter();
  data.title = extractFirstHeading(data.body as string)?.text as string;
  data.description = extractFirstParagraph(data.body as string);
  return (
    <div className="fixed flex justify-between items-center z-10 w-full p-2 border-b dark:border-stone-700 border-stone-400 dark:bg-zinc-800 bg-stone-200">
      <div>TDAEditor</div>
      <div className="flex items-center space-x-2">
        <LuArrowLeft
          className="h-6 w-6 cursor-pointer"
          onClick={() => router.back()}
        />
        <LuSave
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            _update(data as Article);
            toast.success("Article Created!");
            router.replace(`/articles/${params.id}`);
            router.refresh;
          }}
        />
        <LuTrash
          className="h-6 w-6 cursor-pointer"
          onClick={async () => {
            await _delete(params.id as string);
            router.replace("/articles");
            router.refresh;
          }}
        />
      </div>
    </div>
  );
};

export default Header;
