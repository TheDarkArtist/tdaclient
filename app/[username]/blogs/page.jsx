"use client";

import BlogCard from "@/components/BlogCard";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const list = [];
      const q = query(
        collection(db, "blogs"),
        where("author", "==", params.username)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setUserBlogs(list);
    };

    getBlogs();
  }, [params.username]);

  return (
    <div className="flex flex-wrap justify-start my-4">
      {userBlogs
        ? userBlogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))
        : "++ NO BLOGS ++"}
    </div>
  );
};

export default Page;
