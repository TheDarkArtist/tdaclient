import { _getOne } from "@/lib/actions/articles";
import { getSession } from "@/lib/auth";
import TDAEditor from "@/utils/editor/tda-editor";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (session.user.access === "root") {
    return (
      <div className="pt-16 absolute h-full w-full">
        <TDAEditor params={params} />
      </div>
    );
  }

  const data = await _getOne(params.id);
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="pt-16 absolute h-full w-full">
      <TDAEditor params={params} />
    </div>
  );
};

export default page;
