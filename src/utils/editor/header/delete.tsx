import { _delete } from "@/lib/actions/articles";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { LuTrash } from "react-icons/lu";

const Delete = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <LuTrash
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={async () => {
        await _delete(params.id as string);
        router.replace("/articles");
        router.refresh;
      }}
    />
  );
};

export default Delete;
