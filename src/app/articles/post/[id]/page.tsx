import { _getOne } from "@/lib/actions/articles";
import { getSession } from "@/lib/auth";
import Editor from "@/ui/editor/editor";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const data = await _getOne(params.id);
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <>
      <div className="pt-20 p-4 flex w-full justify-center">
        <div className="md:max-w-[60rem] w-full ">
          <Editor post={data} />
        </div>
      </div>
    </>
  );
};

export default page;
