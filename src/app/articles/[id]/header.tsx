import { _getOne } from "@/lib/actions/articles";
import { getUserById } from "@/lib/actions/utils";
import { formatDateAndTime } from "@/lib/utils";
import ArticleDeleteBtn from "@/ui/articles/article-delete-btn";
import GoBack from "@/ui/utils/back";
import Update from "@/ui/utils/update";
import { Article, User } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import React from "react";

const Header = async ({ params }: { params: Params }) => {
  const article: Article | null = await _getOne(params.id);
  const user: User | null = await getUserById(article?.userId as string);
  return (
    <div className="dark:bg-red-950 bg-gray-200 p-4 rounded-t-md md:h-32 h-28 relative">
      <div className="flex space-x-2 rounded-md justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={(user && user.image) || "/unsplash/user.jpg"}
            className="rounded-full border border-stone-800 md:h-16 md:w-16 h-12 w-12"
            alt="article user image"
            height={100}
            width={100}
          />
          <div>
            <div className="text-xs hidden md:block">~ by</div>
            <div className="text-sm font-bold">{(user && user.name) || ""}</div>
            <div className="text-xs font-bold">
              {(user && user.username) || ""}
            </div>
          </div>
        </div>
        <div className="flex h-min items-center gap-4">
          <ArticleDeleteBtn id={article?.userId as string} />
          <Update
            href={`/articles/post/${params.id}?source=ua`}
            userId={article?.userId as string}
          />
          <GoBack href="/articles" />
        </div>
      </div>
      <div className="flex h-min justify-between items-start py-2">
        <div className="text-xs">
          {formatDateAndTime(article?.createdAt as Date).date}{" "}
          {formatDateAndTime(article?.createdAt as Date).time}
        </div>
        <div className="flex space-x-2">
          <div className="text-xs space-x-1 md:text-sm">
            <span>{article?.views.length}</span>
            <span>Views</span>
          </div>
          <div className="hidden text-xs md:text-sm rounded-md">
            <span className="mr-2">up votes</span>
            {article?.upVotes.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
