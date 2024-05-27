"use client";

import React, { useEffect, useState } from "react";
import { MdMenu, MdClear } from "react-icons/md";
import SidenavLinks from "./sidenav-links";
import SidenavCard from "./sidenav-card";

const Sidenav = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      if (showSidebar) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    handleBodyScroll();

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSidebar]);

  return (
    <>
      <button
        className="fixed z-40 right-2 top-3 md:hidden"
        onClick={toggleSidebar}
      >
        {showSidebar ? (
          <MdClear className="h-8 w-8 dark:text-cyan-600 text-cyan-800 transition-all ease-in delay-100" />
        ) : (
          <MdMenu className="h-10 w-10 text-sky-800" />
        )}
      </button>

      <div
        onClick={toggleSidebar}
        className={`${showSidebar ? "w-full" : "w-0"} z-30 bg-black/[.6] dark:bg-grid-red-800/[.2] h-full fixed transition-all ease-in-out`}
      />
      <menu
        className={`transform right-0 ${
          showSidebar ? "w-[80%] translate-x-0" : "translate-x-96"
        } fixed z-30 max-w-80 flex h-full flex-col justify-between border-l dark:bg-dot-red-800/[.4] dark:border-cyan-950 border-stone-600 transition-all ease-in-out bg-stone-400 text-white dark:bg-[#310101] md:hidden dark:backdrop-filter bg-opacity-80 backdrop-blur-sm dark:bg-opacity-40 dark:backdrop-blur-sm shadow-2xl dark:shadow-2xl shadow-stone-800 dark:shadow-red-600/[.6]`}
      >
        <SidenavCard toggleSidebar={toggleSidebar} />
        <SidenavLinks toggleSidebar={toggleSidebar} />
      </menu>
    </>
  );
};

export default Sidenav;
