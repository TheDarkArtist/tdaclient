"use client";

import ActionBar from "@/components/ActionBar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { RotatingLines } from "react-loader-spinner";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";

const os = Open_Sans({ subsets: ["latin"], weight: "400" });

const Details = ({ params }) => {
  const [data, setData] = useState([]);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/blogs/${params.blogId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log("Error fetching blog");
      }
      setLoading(false);
    };

    fetchData();
  }, [params.blogId, setLoading]);

  return (
    <div className="flex flex-col items-center  w-full">
      <div className="w-full">
        <ActionBar
          title="Blogs"
          actions={{
            Update: `/blogs/update/${params.blogId}`,
            Delete: `/blogs/delete/${params.blogId}`,
          }}
        />
      </div>

      {loading ? (
        <div className="flex mt-40 justify-center">
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
        <div className="p-4 md:px-8 mt-12 bg-[#121212] overflow-hidden rounded-md pb-10 mb-10 md:max-w-[65rem] w-screen">
          <div className={`border-b-green-950 ${os.className}`}>
            <h1 className="text-[6vw] md:text-[2.5vw] font-extrabold  pt-4">
              {data.title}
            </h1>
            <div className="text-sm flex space-x-1">
              <p>by</p>
              <strong className="text-red-400">{data.author}</strong>
            </div>
            <div className="text-sm pb-8">
              Created {data.createdAt} | updated: {data.updatedAt}
            </div>
          </div>
          <MarkdownRenderer content={data.description} />
        </div>
      )}
    </div>
  );
};

export default Details;
