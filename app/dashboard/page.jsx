"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import React from "react";
import { MdArticle, MdCode, MdDescription, MdPerson } from "react-icons/md";

const Settings = () => {
  const { currentUser } = useAuth();

  return currentUser && currentUser.root ? (
    <>
      <div className="mx-2 md:mx-10 mt-2 mb-6 space-y-0">
        <h1 className="text-2xl font-bold">Dearly beloved,</h1>
        <p>
          This is a comprehensive dashboard more like a command center for the
          ops to be done here on this very web app in near future.
        </p>
        <p>It&apos;s going to be fun </p>
        <p>
          following cards show some data in them they are clickable and will
          open in their own tab and how more detailed view about their
          respective details, and will provide CRUD functinolay for each thing
        </p>
        <p>the purpose is to make things editable</p>
      </div>
      <div className="flex justify-center flex-wrap">
        <Link
          href={"/dashboard/users"}
          className="flex border border-purple-950 hover:border-sky-800 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2"
        >
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            Users
          </div>
          <div className="bg-zinc-950 h-full p-1">
            <div className="w-full items-center flex justify-between">
              <div className="bg-red-950 text-4xl w-full h-full font-extrabold rounded-lg block border border-red-800 m-1 p-2">
                <div className="text-blue-600 text-sm font-bold">
                  Last three sign up
                </div>
                <ul className="text-xs">
                  <li>sparrow.kushagra@gmail.com</li>
                  <li>tda@thedarkartist.in</li>
                  <li>kushagras152141@gmail.com</li>
                </ul>
              </div>
              <div className="bg-yellow-900 text-4xl w-36 h-full font-extrabold rounded-lg block border border-red-800 m-1 p-2">
                <div className="text-sm pb-1">Total users</div>
                <div>50</div>
              </div>
            </div>
            <div className="flex h-20">
              <div className="bg-blue-950 text-4xl w-full h-full font-extrabold rounded-lg block border border-red-800 m-1 p-2">
                <div className="text-sm pb-1">user access</div>
                <div>50</div>
              </div>
              <div className="bg-red-900 text-4xl w-full h-full font-extrabold rounded-lg block border border-red-800 m-1 p-2">
                <div className="text-sm pb-1">root access</div>
                <div>50</div>
              </div>
              <div className="bg-orange-950 text-4xl w-full h-full font-extrabold rounded-lg block border border-red-800 m-1 p-2">
                <div className="text-sm pb-1">last signup</div>
                <div className="text-xs text-green-600">june 2, 2005</div>
                <div className="text-xs text-green-600">04:03:02 pm</div>
              </div>
            </div>
          </div>
        </Link>

        <Link href={'/dashboard/messages'} className="flex border border-sky-950 bg-zinc-950 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2">
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            Messages
          </div>
          <div className="flex justify-between">
            <div className="w-full border rounded-md border-sky-500  m-1 font-bold">
              <div className="p-1 bg-sky-950">Recent Messages</div>
              <ul className="p-1 text-xs overflow-hidden">
                <li>kushagra</li>
                <li className="">somehting that you want to be</li>
              </ul>
            </div>
            <div className="flex w-56 flex-col">
              <div className="border border-sky-500 m-1 p-1 rounded-md bg-purple-950">
                <div>New Messages</div>
                <div className="text-4xl font-bold">10</div>
              </div>
              <div className="border border-sky-500 m-1 p-1 rounded-md bg-purple-950">
                <div>Total Messages</div>
                <div className="text-4xl font-bold">60</div>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex border border-sky-950 bg-zinc-950 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2">
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            Resume
          </div>
          <div className="flex h-full w-full">
            <div className="m-2">
              <MdCode className="h-40 w-40" />
            </div>
            <div className="w-full">
              <div className="flex flex-col p-2 h-full items-center justify-center">
                <div className="text-6xl font-bold">60</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border border-sky-950 bg-zinc-950 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2">
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            Resume
          </div>
          <div className="flex h-full w-full">
            <div className="m-2">
              <MdArticle className="h-40 w-40" />
            </div>
            <div className="w-full">
              <div className="flex flex-col p-2 h-full items-center justify-center">
                <div className="text-6xl font-bold">60</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border border-sky-950 bg-zinc-950 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2">
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            Resume
          </div>
          <div className="flex h-full w-full">
            <div className="m-2">
              <MdDescription className="h-40 w-40" />
            </div>
            <div className="w-full">
              <div className="flex flex-col p-2 items-center justify-center">
                <div className="text-2xl font-bold">Viewed</div>
                <div className="text-4xl font-bold">60</div>
              </div>
              <div className="flex flex-col p-2 items-center justify-center">
                <div className="text-2xl font-bold">Downloaded</div>
                <div className="text-4xl font-bold">60</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex border border-sky-950 bg-zinc-950 overflow-hidden flex-col h-56 w-full max-w-[34rem]  rounded-md m-2">
          <div className="text-xl px-2 py-0.5 bg-blue-950 font-extrabold">
            About
          </div>
          <div className="flex h-full w-full">
            <div className="m-2">
              <MdPerson className="h-40 w-40" />
            </div>
            <div className="w-full">
              <div className="flex flex-col p-2 h-full items-center justify-center">
                <div className="text-2xl font-bold">Viewed</div>
                <div className="text-4xl font-bold">60</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full text-center">NOT AUTHORIZED</div>
  );
};

export default Settings;
