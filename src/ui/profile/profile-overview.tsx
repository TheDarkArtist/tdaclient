import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const ProfileOverview = ({ user }: { user: User }) => {
  return (
    <div className="flex m-4 gap-4">
      <div>
        <Image className="rounded-md" src={user.image} alt={user.name} height={200} width={200} />
      </div>
      <div>
        <div className="flex flex-col space-y-2">
          <span className="text-2xl">{user.name}</span>
          <span>{user.username}</span>
          <span>{user.email}</span>
          <span className="rounded-full w-min px-2 dark:bg-blue-600 bg-blue-400">
            {user.access}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
