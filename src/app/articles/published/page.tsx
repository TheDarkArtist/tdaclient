import { getSession } from "@/lib/auth";
import PublishedArticleList from "@/ui/articles/pub-article-list";
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
            Your Published Articles
          </h1>
          <GoBack href="/articles/" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <PublishedArticleList />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
