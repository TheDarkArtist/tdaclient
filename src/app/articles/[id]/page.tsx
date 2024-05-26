import { _getOne } from "@/lib/actions/articles";
import GoBack from "@/ui/utils/back";
import Update from "@/ui/utils/update";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import MarkDownRenderer from "@/ui/utils/markdown-renderer";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { formatDateAndTime } from "@/lib/utils";
import { getUserById } from "@/lib/actions/utils";
import ArticleDeleteBtn from "@/ui/articles/article-delete-btn";
import { Article, User } from "@prisma/client";

const Page = async ({ params }: { params: Params }) => {
  const article: Article | null = await _getOne(params.id);
  const user: User | null = await getUserById(article?.userId as string);
  revalidateTag("article");
  return (
    <div className="flex justify-center md:pt-24 pt-20 md:p-4 p-2 space-x-4">
      <div className="md:max-w-[60rem] bg-gradient-to-r dark:from-[#121811] dark:via-black dark:to-[#000810] from-stone-200 via-stone-100 to-stone-200 p-4 w-full h-full overflow-hidden">
        <div className="flex space-x-2 rounded-md justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={(user && user.image) || "/unsplash/user.jpg"}
              className="rounded-full border border-stone-800 h-12 w-12"
              alt="article user image"
              height={100}
              width={100}
            />
            <div>
              <div className="text-xs hidden md:block">~ by</div>
              <div className="font-bold">{(user && user.name) || ""}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <ArticleDeleteBtn id={article?.id as string} />
            <Update
              href={`/articles/post/${params.id}?source=ua`}
              userId={article?.userId as string}
            />
            <GoBack href="/articles" />
          </div>
        </div>
        <div className="flex justify-between mb-10 py-2">
          <div className="text-xs">
            Created: {formatDateAndTime(article?.createdAt as Date).date}{" "}
            {formatDateAndTime(article?.createdAt as Date).time}
          </div>
          <div></div>
          <div className="flex gap-2">
            <div className="bg-red-950 hidden px-4 py-1 rounded-md">
              <span className="mr-2">views</span>
              {article?.upVoteCount}
            </div>
            <div className="dark:bg-red-950 bg-stone-200 px-2 py-1 rounded-md">
              <span className="mr-2">Views</span>
              {article?.views}
            </div>
            <div className="dark:bg-red-950 bg-stone-200 px-2 py-1 rounded-md">
              <span className="mr-2">up votes</span>
              {article?.upVoteCount}
            </div>
          </div>
        </div>
        <div className="text-2xl">{article?.title}</div>
        <div className="border-b border-stone-600 my-2" />
        <MarkDownRenderer content={article?.body as string} />
      </div>
    </div>
  );
};

export default Page;
