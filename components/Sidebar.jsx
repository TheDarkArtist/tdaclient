"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  MdArticle,
  MdClose,
  MdCode,
  MdDashboard,
  MdDescription,
  MdHome,
  MdInfo,
  MdLogin,
  MdLogout,
  MdMenu,
  MdMessage,
  MdPerson,
  MdVerifiedUser,
} from "react-icons/md";
import VersionInfo from "./VersionInfo";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Tooltip from "@/components/Tooltip";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const toggleSidebar = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    const handleBodyScroll = () => {
      if (isOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      handleBodyScroll();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, toggleSidebar]);

  const items = [
    {
      title: "Home",
      logo: <MdHome className="h-6 w-6 mx-4" />,
      link: "/",
    },
    {
      title: "Projects",
      logo: <MdCode className="h-6 w-6 mx-4" />,
      link: "/projects",
    },
    {
      title: "Blogs",
      logo: <MdArticle className="h-6 w-6 mx-4" />,
      link: "/blogs",
    },
    {
      title: "Resume",
      logo: <MdDescription className="h-6 w-6 mx-4" />,
      link: "/about/resume",
    },
    {
      title: "About",
      logo: <MdPerson className="h-6 w-6 mx-4" />,
      link: "/about",
    },
  ];

  const handleSignOut = () => {
    logout();
    toggleSidebar();
    router.replace("/");
  };

  return (
    <>
      <MdMenu
        onClick={toggleSidebar}
        className="h-10 fixed z-50 right-1 top-1 md:top-3 w-10 text-stone-400 mx-2 cursor-pointer"
      />
      <div
        id="sidebar-cover"
        className={`fixed z-20 bg-opacity-40 h-full w-full bg-black ${isOpen ? "" : "hidden"}`}
      ></div>
      <menu
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col justify-between fixed top-0 right-0 w-80 p-1 h-full bg-red-950 text-white transition-transform duration-120 ease-in-out backdrop-filter bg-opacity-20 backdrop-blur-lg z-50`}
      >
        <div>
          <MdClose
            onClick={toggleSidebar}
            className="absolute font-bold h-6 w-6 top-4 right-4 cursor-pointer"
          />
          <div className="border border-sky-950 flex flex-col font-bold w-full h-40  from-blue-600 via-yellow-600 to-red-600">
            <div className="flex items-center p-2 h-11 space-x-2">
              <Tooltip text="Verified user badge">
                <MdVerifiedUser className="h-6 w-6 text-cyan-600 cursor-pointer" />
              </Tooltip>
            </div>
            <div className="px-2 text-stone-400 py-4 border-b border-t h-20 border-cyan-950">
              {currentUser ? (
                <>
                  {currentUser && currentUser.name.first ? (
                    <>
                      <p className="text-2xl space-x-2">
                        <span>{currentUser && currentUser.name.first}</span>
                        <span>{currentUser && currentUser.name.last}</span>
                      </p>
                      <span className="flex space-x-2 text-sm">
                        <p>{currentUser && currentUser.username}</p>
                        <p>&lt; {currentUser && currentUser.email} &gt; </p>
                      </span>
                    </>
                  ) : (
                    <div className="flex justify-center items-center flex-col text-stone-400">
                      <span className="text-2xl">
                        {currentUser && currentUser.username}
                      </span>
                      <span>{currentUser && currentUser.email}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center items-center h-full text-4xl">
                  Welcome to TDA&apos;s
                </div>
              )}
            </div>
            {currentUser && currentUser ? (
              <div className="p-2 text-sm text-cyan-600 flex flex-wrap space-x-4">
                <Link
                  onClick={toggleSidebar}
                  href={`/${currentUser.username}`}
                  className="underline hover:text-cyan-500 cursor-pointer"
                >
                  view profile
                </Link>
                <Link
                  href={`/${currentUser.username}/blogs`}
                  onClick={toggleSidebar}
                  className="underline hover:text-cyan-500 cursor-pointer"
                >
                  My blogs
                </Link>
              </div>
            ) : (
              <div className="p-2 text-sm text-cyan-600 flex flex-wrap space-x-4">
                <p>log in or sign up to access your profile</p>
              </div>
            )}
          </div>
          <menu className="flex w-full mt-2">
            {!currentUser ? (
              <Link
                href={"/auth/signin"}
                onClick={toggleSidebar}
                className="flex items-center w-full h-10 px-4 border-y border-red-950 hover:bg-blue-950"
              >
                <MdLogin className="h-6 w-6 mx-4" /> Sign In
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="flex items-center w-full h-10 px-4 border-y border-red-950 hover:bg-blue-950"
              >
                <MdLogout className="h-6 w-6 mx-4" /> Sign Out
              </button>
            )}
          </menu>
          {items.map((item) => (
            <li
              onClick={toggleSidebar}
              key={item.title}
              className="flex items-center w-full h-10 px-4 border-b border-red-950 hover:bg-blue-950"
            >
              <Link
                className="flex items-center w-full h-full"
                href={item.link}
              >
                {item.logo} {item.title}
              </Link>
            </li>
          ))}
        </div>
        <div>
          <menu>
            <li
              onClick={toggleSidebar}
              className="flex items-center w-full h-10 px-4 border-y border-red-950 hover:bg-blue-950"
            >
              <Link
                className="flex items-center w-full h-full"
                href={"/about/contact-me"}
              >
                <MdMessage className="h-6 w-6 mx-4" /> Contact Me
              </Link>
            </li>

            {currentUser && currentUser.root && (
              <li
                onClick={toggleSidebar}
                className="flex items-center w-full h-10 px-4  hover:bg-blue-950"
              >
                <Link
                  className="flex items-center w-full h-full"
                  href={"/dashboard"}
                >
                  <MdDashboard className="h-6 w-6 mx-4" /> Dashboard
                </Link>
              </li>
            )}
            <li className="flex items-center w-full h-10 px-4 border-y border-red-950">
              <MdInfo className="h-6 w-6 mx-4" />
              <VersionInfo />
            </li>
          </menu>
        </div>
      </menu>
    </>
  );
};
export default Sidebar;
