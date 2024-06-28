import { _delete } from "@/lib/actions/articles";
import { Article, Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";

const Back = ({ data }: { data: Article | Project }) => {
  const router = useRouter();
  return (
    <LuArrowLeft
      className="h-6 w-6 cursor-pointer hover:text-red-400"
      onClick={() => {
        if (data.body === "") {
          _delete(data.id);
        }
        router.back();
      }}
    />
  );
};

export default Back;
