"use client";

import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ProfileNavbar = ({ children, username }) => {
  const [userExistsState, setUserExistsState] = useState(false);
  const pathname = usePathname();

  const userExists = useCallback(async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return false;
    return true;
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      const exists = await userExists();
      setUserExistsState(exists);
    };
    fetchUser();
  }, [userExists]);

  return (
    <>
      {userExistsState ? (
        <>
          <div>
            <div>
              <div
                className={`border-b border-stone-700 md:text-xl flex bg-zinc-900 text-sm px-[5vw] pt-2 mb-2`}
              >
                <span className={`font-bold pr-4`}>{username}</span>

                <Link
                  href={`/${username}`}
                  className={`${pathname && pathname === "/" + username ? "border-b-4 border-red-600" : ""} focus:outline-none  border-red-600  cursor-pointer px-1 mx-2`}
                >
                  overview
                </Link>

                <Link
                  href={`/${username}/blogs`}
                  className={`${pathname && pathname === "/" + username + "/blogs" ? "border-b-4 border-red-600" : ""} focus:outline-none  border-red-600  cursor-pointer px-1 mx-2`}
                >
                  blogs
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full p-2 max-w-[60rem] md:min-w-[60rem]">
              {children}
            </div>
          </div>
        </>
      ) : (
        <div>USER DOES NOT EXIST</div>
      )}
    </>
  );
};

export default ProfileNavbar;
