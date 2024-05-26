"use client";

import ActionBar from "@/components/ActionBar";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { RotatingLines } from "react-loader-spinner";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";

const os = Open_Sans({ subsets: ["latin"], weight: "400" });

const Details = ({ params }) => {
  const [data, setData] = useState([]);
  const { loading, setLoading } = useLoading();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/projects/${params.projectId}`);
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
  }, [params.projectId, setLoading]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <ActionBar
          title="Projects"
          actions={
            currentUser && currentUser.root
              ? {
                  Update: `/projects/update/${params.projectId}`,
                  Delete: `/projects/delete/${params.projectId}`,
                }
              : {}
          }
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
        <div className="p-4 md:px-8 mt-12 bg-[#121212] overflow-hidden rounded-md pb-10 w-screen md:max-w-[65rem]">
          <div className={`border-b-green-950 ${os.className}`}>
            <h1 className="text-[6vh] font-extrabold pt-4">{data.name}</h1>
            <div className="text-sm ">
              by <strong className="text-red-400"> Kushagra Sharma</strong>
            </div>

            <div className="text-sm space-x-1">
              <span>Created {data.createdAt}</span> <span>|</span>{" "}
              <span>updated: {data.updatedAt}</span>
            </div>
          </div>

          <div className="flex flex-col text-sm space-y-2 my-4 ">
            <h2 className="text-xl">Languages & Frameworks used</h2>
            <div className="flex w-full">
              <ul className="flex space-x-2">
                {data.languages &&
                  data.languages.map((lang, index) => (
                    <li
                      className="border border-stone-600 rounded-md px-2"
                      key={index}
                    >
                      {lang}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex w-full">
              <ul className="flex space-x-2">
                {data.frameworks &&
                  data.frameworks.map((frame, index) => (
                    <li
                      className="border border-stone-600 rounded-md px-2"
                      key={index}
                    >
                      {frame}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-start text-red-400 border-red-400 my-8 border-dashed">
            contact me if you have any suggestions...
          </div>
          <MarkdownRenderer content={data.description} />
        </div>
      )}
    </div>
  );
};

export default Details;
