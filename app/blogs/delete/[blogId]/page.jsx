"use client";

import { notify } from "@/components/Notification";
import { db } from "@/firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MdDelete, MdDeleteForever } from "react-icons/md";

const Delete = ({ params }) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/v1/blogs/${params.blogId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        notify("Blog deleted successfully", "success");
        router.push(`/blogs`);
      } else {
        notify("Error deleting blog", "error");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
      notify("Error deleting blog", "error");
    }
  };

  const handleNoClick = () => {
    router.push(`/blogs/${params.blogId}`);
  };

  return currentUser && currentUser.root ? (
    <>
      <div className="flex mt-10 flex-col w-full md:max-w-[60rem] ">
        <div className="flex justify-center">
          <MdDeleteForever className="h-40 w-40" />
        </div>
        <h1 className="text-2xl md:text-4xl px-4 ">
          Do you really wish to delete the following blog?
        </h1>
        <div className="m-4">Name: ID: {params.blogId}</div>
        <div className="flex justify-start m-4">
          <button
            onClick={handleDelete}
            className="bg-green-800 hover:bg-green-700 text-white px-10 py-1 m-1"
          >
            Yes
          </button>
          <button
            onClick={handleNoClick}
            className="bg-red-800 hover:bg-red-700 text-white px-10 py-1 m-1"
          >
            No
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>NOT AUTHORIZED </div>
  );
};

export default Delete;
