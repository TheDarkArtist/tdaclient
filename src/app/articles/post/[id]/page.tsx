import { _getOne } from "@/lib/actions/articles";
import { getSession } from "@/lib/auth";
import TDAEditor from "@/utils/editor/tda-editor";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";

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
          <TDAEditor params={params} source={searchParams.source} />
        </Suspense>
      </div>
    );
  }

  const data = await _getOne(params.id);
  if (!data || data.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="pt-16 absolute h-full w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <TDAEditor params={params} source={searchParams.source} />
      </Suspense>
    </div>
  );
};

export default page;
