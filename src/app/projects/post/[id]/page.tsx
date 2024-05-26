import { _getOne } from "@/lib/actions/projects";
import { getSession } from "@/lib/auth";
import GoBack from "@/ui/utils/back";
import Editor from "@/ui/editor/editor";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { Project } from "@prisma/client";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await _getOne(params.id);

  return (
    <>
      <div className="pt-20 flex w-full justify-center">
        <div className="md:max-w-[60rem] w-full ">
          <Editor post={data as Project} />
        </div>
      </div>
    </>
  );
};

export default page;
