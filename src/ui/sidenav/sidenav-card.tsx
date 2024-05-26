import Link from "next/link";
import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import Image from "next/image";
import { useSession } from "next-auth/react";
import ThemeToggle from "../utils/theme-toggle";

interface SidenavCardProps {
  toggleSidebar: () => void;
}

const SidenavCard: React.FC<SidenavCardProps> = ({ toggleSidebar }) => {
  const { data, status } = useSession();

  return (
    <div className="border border-l-0 dark:border-sky-950 border-sky-600 flex flex-col font-bold w-full h-40 from-blue-600 via-yellow-600 to-red-600">
      <div className="flex items-center justify-between p-2 h-11 space-x-2">
        <MdVerifiedUser className="h-6 w-6 dark:text-cyan-600 text-cyan-800 cursor-pointer" />
        <span className="pr-8 pt-2">
          <ThemeToggle />
        </span>
      </div>
      <div className="px-2 text-stone-800 dark:text-stone-400">
        {status === "authenticated" ? (
          data?.user?.name ? (
            <div className="flex items-center justify-center h-full">
              <Image
                src={data.user.image || "/me.png"}
                className="rounded-full h-16 w-16 border border-red-900 mr-2"
                alt="profile image"
                height={100}
                width={100}
              />
              <div className="flex flex-col justify-start">
                <p className="text-xl font-bold">{data.user.name}</p>
                <p className="flex flex-wrap items-center text-sm">
                  <span className="mr-1">{data.user.username}</span>
                  <span className="text-xs">&lt; {data.user.email} &gt;</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col text-stone-400">
              <span className="text-2xl">{data.user.username}</span>
              <span>{data.user.email}</span>
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-full text-4xl">
            Welcome to TDA&apos;s
          </div>
        )}
      </div>
      {status === "authenticated" ? (
        <div className="px-2 pt-2 pb-1 text-sm text-black dark:text-cyan-500 flex flex-wrap space-x-4">
          <Link
            href={`/${data.user.username}`}
            onClick={toggleSidebar}
            className="hover:text-cyan-500 cursor-pointer"
          >
            View Profile
          </Link>
          <Link
            href="#"
            onClick={toggleSidebar}
            className="hover:text-cyan-500 cursor-pointer"
          >
            My Blogs
          </Link>
        </div>
      ) : (
        <div className="p-2 text-sm dark:text-cyan-600 text-cyan-950 flex flex-wrap space-x-4">
          <p>Log in or sign up to access your profile</p>
        </div>
      )}
    </div>
  );
};

export default SidenavCard;
