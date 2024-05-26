import { _getOne } from "@/lib/actions/projects";
import GoBack from "@/ui/utils/back";
import Update from "@/ui/utils/update";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import MarkDownRenderer from "@/ui/utils/markdown-renderer";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import { formatDateAndTime } from "@/lib/utils";
import ProjectDeleteBtn from "@/ui/projects/project-delete-btn";

const Page = async ({ params }: { params: Params }) => {
  const project = await _getOne(params.id);
  revalidateTag("article");
  return (
    <div className="flex justify-center md:pt-24 pt-20 md:p-4 p-2 space-x-4">
      <div className="md:max-w-[60rem] bg-gradient-to-r dark:from-[#210417] dark:via-black dark:to-[#000810] from-stone-100 via-white to-stone-100 p-4 w-full h-full overflow-hidden">
        <div className="flex space-x-2 rounded-md justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={"/me.png"}
              className="rounded-full border border-sky-600 h-12 w-12"
              alt="article user image"
              height={100}
              width={100}
            />
            <div>
              <div className="text-xs hidden md:block">~ by</div>
              <div className="font-bold">Kushagra sharma</div>
            </div>
          </div>
          <div className="flex gap-2">
            <ProjectDeleteBtn id={project && project?.id || ''} />
            <Update href={`/projects/post/${params.id}?source=up`} />
            <GoBack href="/projects" />
          </div>
        </div>
        <div className="flex justify-between mb-10 py-2">
          <div className="text-xs">
            <div>
              Created: {formatDateAndTime(project?.createdAt as Date).date}{" "}
              {formatDateAndTime(project?.createdAt as Date).time}
            </div>
          </div>
          <div></div>
          <div className="flex gap-2">
            <div className="bg-red-950 hidden px-4 py-1 rounded-md">
              <span className="mr-2">views</span>
              {project?.upVotes.length}
            </div>
            <div className="flex gap-2 dark:border dark:border-stone-800 items-center dark:bg-transparent text-xs h-min bg-stone-200 px-2 py-1 rounded-md">
              <LuEye width={18} />
              <span>{project?.views}</span>
            </div>
            <div className="flex gap-2 dark:border dark:border-stone-800  items-center dark:bg-transparent text-xs h-min bg-stone-200 p-2 rounded-md">
              <span>{project?.upVotes.length}</span>
            </div>
          </div>
        </div>
        <div className="text-2xl">{project?.title}</div>
        <div className="border-b border-stone-600 my-6" />
        <MarkDownRenderer content={project?.body as string} />
      </div>
    </div>
  );
};

export default Page;
