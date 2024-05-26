"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import NavMenu from "./nav-menu";

const NavProfile = () => {
  const { data, status } = useSession();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="hidden md:inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-2 font-medium text-slate-400 transition-colors focus:outline-none focus:border-green-800"
        onClick={handleMenuToggle}
      >
        <div>
          <Image
            src={
              status === "authenticated" && data?.user?.image
                ? data.user.image
                : "/unsplash/user.jpg"
            }
            className="rounded-full w-full h-full"
            alt="user image"
            width={25}
            height={25}
          />
        </div>
        {status === "authenticated" && data?.user?.name && (
          <div className="ml-2">{data.user.name}</div>
        )}
      </button>
      <NavMenu isMenuOpen={isMenuOpen} />
    </>
  );
};

export default NavProfile;
