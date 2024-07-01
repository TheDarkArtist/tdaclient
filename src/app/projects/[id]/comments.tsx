import { getComments } from "@/lib/actions/projects";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { LuThumbsUp } from "react-icons/lu";
import { User } from "@prisma/client";

interface DataInterface {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId: string;
  parentType: string;
  articleId: string;
  projectId: string;
  user: User;
}

const Comments = async ({ params }: { params: Params }) => {
  const comments = await getComments(params.id);
  return (
    <div className="w-full dark:text-gray-300 my-4 p-2 overflow-hidden bg-dot-stone-600/20 rounded-md">
      <div className="mx-4 space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} data={comment as DataInterface} />
        ))}
      </div>
    </div>
  );
};

export default Comments;

const Comment = ({ data }: { data: DataInterface }) => {
  return (
    <div className="flex flex-col rounded-md ">
      <div className="flex items-center">
        <div className="flex gap-2 items-center">
          <Image
            src={data.user.image as string}
            className="rounded-full"
            alt="comment user"
            height={32}
            width={32}
          />
          <p className="text-sm font-bold">{data.user.username}</p>
          <p className="text-xs dark:text-stone-400 text-stone-600 min-w-32">
            {formatDistanceToNow(data.createdAt, { addSuffix: true })}
          </p>
        </div>
        <div className="border border-dashed dark:border-stone-800 border-stone-400 w-full mx-4" />
        <div className="text-sm w-min whitespace-nowrap flex gap-2">
          <p>26</p>
          <LuThumbsUp />
        </div>
      </div>
      <p className="ml-10 text-sm">{data.text}</p>
    </div>
  );
};
