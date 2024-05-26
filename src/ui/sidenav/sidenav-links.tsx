import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import VersionInfo from "@/ui/utils/version";
import {
  LuBook,
  LuCode,
  LuHome,
  LuLogIn,
  LuLogOut,
  LuInfo,
  LuLayoutDashboard,
} from "react-icons/lu";
import { signIn, signOut, useSession } from "next-auth/react";

interface SidenavLinksProps {
  toggleSidebar: () => void;
}

const SidenavLinks: React.FC<SidenavLinksProps> = ({ toggleSidebar }) => {
  const pathname = usePathname();
  const { data, status } = useSession();

  const topLinks = [
    {
      name: "Home",
      href: "/",
      isActive: pathname === "/",
      icon: <LuHome className="w-5 h-5" />,
    },
    {
      name: "Projects",
      href: "/projects",
      isActive: pathname === "/projects",
      icon: <LuCode className="w-5 h-5" />,
    },
    {
      name: "Articles",
      href: "/articles",
      isActive: pathname === "/articles",
      icon: <LuBook className="w-5 h-5" />,
    },
  ];

  const bottomLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      isActive: pathname === "/dashboard",
      hidden: data?.user.access !== "root",
      icon: <LuLayoutDashboard className="h-5 w-5" />,
    },
    {
      name: <VersionInfo />,
      href: "",
      isActive: "",
      hidden: false,
      icon: <LuInfo className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col h-full text-black dark:text-white justify-between">
      <div className="relative">
        {topLinks.map(({ name, href, isActive, icon }) => (
          <Link
            key={href}
            className={`flex items-center py-1.5 px-6 border-t dark:border-red-950 border-stone-400 ${isActive ? "bg-gradient-to-r from-blue-500 dark:from-sky-800 via-rose-400 dark:via-rose-900 to-sky-400 dark:to-cyan-900" : ""}`}
            href={href}
            onClick={toggleSidebar}
          >
            {isActive && (
              <div className="dark:bg-yellow-600 bg-sky-400 h-9 rounded-r-md w-2 absolute left-0" />
            )}
            <div className="relative flex items-center space-x-4">
              <span>{icon}</span>
              <span className="font-black dark:font-normal">{name}</span>
            </div>
          </Link>
        ))}
        <div className="border-b dark:border-red-950 border-stone-400" />
      </div>

      <div>
        {status === "authenticated" ? (
          <button
            className={`flex items-center py-1.5 px-6 border-t dark:border-red-950 border-stone-400 ${pathname.startsWith("/signin") ? "dark:bg-sky-950 bg-gradient-to-r from-red-300 dark:from-sky-800 via-red-400 dark:via-rose-500 to-red-300 dark:to-cyan-950" : ""}`}
            onClick={() => {
              toggleSidebar();
              signOut();
            }}
          >
            <div className="flex items-center space-x-4">
              <span>
                <LuLogOut />
              </span>
              <span className="font-extrabold dark:font-normal">Sign Out</span>
            </div>
          </button>
        ) : (
          <button
            className={`flex items-center py-1.5 px-6 border-t dark:border-red-950 border-stone-400 ${pathname.startsWith("/signin") ? "dark:bg-sky-950 bg-gradient-to-r from-red-300 dark:from-sky-800 via-red-400 dark:via-rose-500 to-red-300 dark:to-cyan-950" : ""}`}
            onClick={() => {
              toggleSidebar();
              signIn("google");
            }}
          >
            <div className="flex items-center space-x-4">
              <span>
                <LuLogIn />
              </span>
              <span className="font-extrabold dark:font-normal">Sign In</span>
            </div>
          </button>
        )}
        {bottomLinks.map(({ name, href, isActive, icon, hidden }) => (
          <Link
            key={href}
            className={`flex items-center py-1.5 px-6 border-t dark:border-red-950 border-stone-400 ${isActive ? "dark:bg-sky-950 bg-gradient-to-r from-red-300 dark:from-sky-800 via-red-400 dark:via-rose-500 to-red-300 dark:to-cyan-950" : ""} ${hidden ? "hidden" : ""}`}
            href={href}
            onClick={toggleSidebar}
          >
            <div className="flex items-center space-x-4">
              <span>{icon}</span>
              <span className="font-extrabold dark:font-normal">{name}</span>
            </div>
          </Link>
        ))}
        <div className="border-b dark:border-red-950 border-stone-400" />
      </div>
    </div>
  );
};

export default SidenavLinks;
