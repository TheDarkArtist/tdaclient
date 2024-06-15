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
import TOC from "@/utils/table-of-contents";

const Page = async ({ params }: { params: Params }) => {
  const article: Article | null = await _getOne(params.id);
  const user: User | null = await getUserById(article?.userId as string);
  revalidateTag("article");
  return (
    <>
      <div className="flex justify-center md:pt-20 pt-20 md:p-4 p-2 space-x-4 min-h-screen">
        <div>
          <div className="dark:bg-red-950 bg-gray-200 p-4 rounded-t-md">
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
                <div className="hidden px-4 py-1 text-sm rounded-md">
                  <span className="mr-2">views</span>
                  {article?.upVotes.length}
                </div>
                <div className="px-2 py-1 text-sm rounded-md">
                  <span className="mr-2">Views</span>
                  {article?.views}
                </div>
                <div className="px-2 py-1 text-sm rounded-md">
                  <span className="mr-2">up votes</span>
                  {article?.upVotes.length}
                </div>
              </div>
            </div>
          </div>
          <div className="md:max-w-[60rem] dark:bg-[#111111] bg-white p-4 w-full h-full overflow-hidden">
            <MarkDownRenderer content={article?.body as string} />
          </div>
        </div>
        <div className="relative min-w-60 max-w-96 hidden md:block">
          <TOC content={article?.body || ""} navbarHeight={68} />
        </div>
      </div>
    </>
  );
};

export default Page;
