"use client";

import React, { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Link from "next/link";
import { notify } from "@/components/Notification";
import ActionBar from "@/components/ActionBar";
import MarkdownHelp from "@/components/MarkdownHelp";
import MarkdownEditor from "@/components/MarkdownEditor";
import { getCurrentDate } from "@/app/utils";
import { useRouter } from "next/navigation";

const Create = ({ params }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const handleDefaultData = async () => {
      const docRef = doc(db, "blogs", params.blogId);
      const docSnap = await getDoc(docRef);
      setDesc(docSnap.data().description);
      setTags(docSnap.data().tags);
      setName(docSnap.data().title);
    };

    handleDefaultData();
  }, [params.blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = fetch(`/api/v1/blogs/${params.blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          description: desc,
          updatedAt: getCurrentDate(),
          tags: tags,
        }),
      });
      const res = await response;
      if (res.ok) {
        notify("Blog updated successfully", "success");
      } else {
        notify("Failed to update blog", "error");
      }
      router.back();
    } catch (error) {
      console.error("Error updating document: ", error);
      notify("Error updating blog", "error");
    }
  };

  const handleCancel = () => {
    setName("");
    window.history.back();
  };

  const handleTagInputChange = (event) => {
    setTagInputValue(event.target.value);
  };

  const handleTagInputKeyPress = (event) => {
    if (event.key === "Enter") event.preventDefault();
    if (
      event.key === "Enter" ||
      (event.key === " " && tagInputValue.trim() !== "")
    ) {
      if (!tags.includes(tagInputValue.trim())) {
        setTags([...tags, tagInputValue.trim()]);
      }
      setTagInputValue("");
    }
  };
  const toggleTag = (language) => {
    if (tags.includes(language)) {
      setTags(tags.filter((lang) => lang !== language));
    } else {
      setTags([...tags, language]);
    }
  };

  return (
    <>
      <div className="w-full">
        <ActionBar
          title={"Blogs"}
          actions={{
            Cancel: `/blogs/${params.blogId}`,
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-[65rem] p-4  mt-10"
      >
        <h1 className="text-4xl my-4 w-full">Create a new blog</h1>

        <MarkdownHelp />

        <div className="flex flex-wrap md:flex-nowrap w-full justify-between items-center">
          <div className=" flex items-center space-x-2 space-y-2 mx-2 mb-2 w-full">
            <div className="mt-2 font-bold text-blue-400">
              <Link href="/blogs">Blogs</Link>
            </div>
            <div>/</div>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="bg-black rounded-md border w-full py-0.5 px-1 font-bold border-zinc-600 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex space-x-2 py-2 w-full justify-end mb-2 rounded-md">
            <button
              onClick={handleCancel}
              className="bg-zinc-900 px-2 py-0.5 w-40 text-center rounded-sm hover:bg-zinc-800"
            >
              Cancle
            </button>
            <button className="bg-green-800 px-2 py-0.5 w-40 text-center font-bold rounded-sm hover:bg-green-900">
              Update
            </button>
          </div>
        </div>

        <div className="flex justify-start items-center w-full">
          <input
            type="text"
            placeholder="Tags"
            value={tagInputValue}
            onChange={handleTagInputChange}
            onKeyDown={handleTagInputKeyPress}
            inputMode="text"
            className="rounded border border-zinc-600 mx-2 px-2 py-0 w-32 bg-black text-white mb-4 focus:outline-none"
          />
          <div className="flex flex-wrap space-x-2 items-center mb-4">
            <h3 className="">Tags:</h3>
            {tags.map((language, index) => (
              <span
                key={index}
                onClick={() => toggleTag(language)}
                className={`cursor-pointer ${tags.includes(language) ? "text-white" : "text-gray-800"} flex flex-wrap rounded-sm h-4 bg-blue-950 text-sm py-1/2 px-2 my-0.5`}
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <MarkdownEditor desc={desc} setDesc={setDesc} />
      </form>
    </>
  );
};

export default Create;
