import { getSession } from "@/lib/auth";
import DraftProjectList from "@/ui/projects/draft-list";
import GoBack from "@/ui/utils/back";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const page = async () => {
  const session = await getSession();
  if (!session) notFound();
  return (
    <div className="flex justify-center">
      <div className="mt-20 p-4 max-w-[60rem] w-full ">
        <div className="flex justify-between mb-12">
          <h1 className="text-2xl font-bold text-sky-600">
            Your Draft Projects
          </h1>
          <GoBack href="/projects" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <DraftProjectList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
