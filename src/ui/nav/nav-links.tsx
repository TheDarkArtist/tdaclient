"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdArticle, MdCode, MdHome } from "react-icons/md";

const NavLinks = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
      isActive: pathname === "/",
      icon: <MdHome width={20} />,
    },
    {
      name: "Projects",
      href: "/projects",
      isActive: pathname.startsWith("/projects") ? true : false,
      icon: <MdCode width={18} />,
    },
    {
      name: "Articles",
      href: "/articles",
      isActive: pathname.startsWith("/articles") ? true : false,
      icon: <MdArticle width={18} />,
    },
  ];

  return (
    <div className="md:flex items-center hidden ml-6">
      {links.map(({ name, href, isActive, icon }) => (
        <Link
          key={name}
          href={href}
          className={`flex w-min h-min text-sm md:text-xl items-center space-x-3 ${
            isActive && `text-red-800 dark:text-red-600`
          } rounded-lg px-2 py-0.5 transition-all duration-150 ease-in-out active:bg-stone-300 hover:bg-stone-200 dark:active:bg-stone-800 dark:hover:bg-stone-900`}
        >
          <div className="flex items-center space-x-1">
            {icon}
            <span>{name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
