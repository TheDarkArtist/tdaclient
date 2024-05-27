import { getUserByUsername } from "@/lib/actions/utils";
import ProfileOverview from "@/ui/profile/profile-overview";
import { User } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

type PageParams = {
  params: {
    id: string;
  };
};

const Page: React.FC<PageParams> = async ({ params }) => {
  const user = await getUserByUsername(params.id);

  if (!user) notFound();

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="md:max-w-[60rem] w-full dark:bg-[#111111] bg-white">
        <ProfileOverview user={user as User} />
      </div>
    </div>
  );
};

export default Page;
