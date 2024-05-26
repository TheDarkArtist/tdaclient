"use client";

import React, { useCallback, useEffect, useState } from "react";

import Search from "@/components/Search";
import BlogCard from "@/components/BlogCard";
import ActionBar from "@/components/ActionBar";
import { RotatingLines } from "react-loader-spinner";
import { useLoading } from "@/contexts/LoadingContext";
import { Open_Sans } from "next/font/google";

const os = Open_Sans({ subsets: ["latin"], weight: "300" });

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const { loading, setLoading } = useLoading();

  const onSearch = useCallback(
    (searchTerm) => {
      setFilteredBlogs((prevBlogs) => {
        if (!searchTerm) {
          return blogs;
        } else {
          return prevBlogs.filter((blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      });
    },
    [blogs]
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/v1/blogs");
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, [setLoading]);

  return (
    <>
      <div className="w-full mb-10">
        <ActionBar title={"Blogs"} actions={{ Create: "/blogs/create" }} />
      </div>

      <div className="w-full md:max-w-[65rem] m-2">
        <div className={`space-y-2 px-4  ${os.className}`}>
          <h1 className="text-4xl font-bold py-4">Welcome to my blog! </h1>
          <p>
            Welcome to my blogging page, where I share my perspectives,
            insights, and experiences on a wide range of topics, with a focus on
            technology and beyond.
          </p>
          <p>
            Through my blog posts, I aim to offer thought-provoking discussions,
            personal reflections, and explorations of emerging trends in areas
            such as artificial intelligence, software development, digital
            innovation and so much more.
          </p>
        </div>

        <div className="flex justify-center my-10 w-full">
          <Search parameter={"Blogs"} onSearch={onSearch} />
        </div>

        {loading ? (
          <div className="flex mt-20 justify-center">
            <RotatingLines
              visible={loading}
              height="40"
              width="40"
              color="green"
              strokeWidth="5"
              animationDuration="0.75"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="inline-flex flex-col  overflow-hidden lg:flex-row md:max-w-[60rem] flex-wrap">
              {blogs
                ? filteredBlogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                  ))
                : "++ NO PROJECTS ++"}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
