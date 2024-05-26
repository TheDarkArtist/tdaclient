import { Megrim } from "next/font/google";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const tda = Megrim({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  return (
    <>
      <header className="fixed flex border-b border-green-950 items-center justify-between bg-black h-12 w-full md:h-16 pl-4 backdrop-filter bg-opacity-60 backdrop-blur-sm z-40">
        <div className={`pb-2 h-full`}>
          <Link href={"/"}>
            <Image className="relative h-full w-full " src="/logo.png" alt="tda logo" height={1000} width={1000} />
          </Link>
        </div>
        <div className="flex items-center">
          <menu className="hidden md:flex text-stone-200 space-x-4 mr-20 md:text-xl">
            <li className={`hover:text-red-400`} >
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-red-400" >
              <Link href={"/projects"}>Projects</Link>
            </li>
            <li className="hover:text-red-400">
              <Link href={"/blogs"}>Blogs</Link>
            </li>
            <li className="hover:text-red-400">
              <Link href={"/about/resume"}>Resume</Link>
            </li>
            <li className="hover:text-red-400">
              <Link href={"/about"}>About</Link>
            </li>
          </menu>
        </div>
      </header>
    </>
  );
};

export default Navbar;
