import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface NavMenuProfileProps {
  data: {
    user: User;
  } | null;
}

const NavMenuProfile: React.FC<NavMenuProfileProps> = ({ data }) => {
  if (!data || !data.user) return null; // Handle null or undefined data and user
  const { user } = data;
  return (
    <section className="flex items-center m-2">
      <Image
        src={user.image || "/default-profile-image.jpg"} // Provide a default image if image is missing
        alt={user.name || 'Dummy'}
        className="rounded-full border dark:border-stone-800"
        height={100}
        width={100}
      />
      <div className="flex flex-col text-xs m-2">
        <span className="text-lg">{user.name}</span>
        <span>{user.email}</span>
        <span>{user.access}</span>
      </div>
    </section>
  );
};

export default NavMenuProfile;
