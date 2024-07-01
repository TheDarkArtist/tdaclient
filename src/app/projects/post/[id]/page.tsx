import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";
import TDAEditor from "@/utils/editor/tda-editor";
import { _getOne } from "@/lib/actions/projects";

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { source: string };
}) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (session.user.access === "root") {
    return (
      <div className="pt-16 absolute h-full w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TDAEditor source={searchParams.source} params={params} />
        </Suspense>
      </div>
    );
  }

  const data = await _getOne(params.id);
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="absolute border h-full w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <TDAEditor params={params} source={searchParams.source} />
      </Suspense>
    </div>
  );
};

export default page;
