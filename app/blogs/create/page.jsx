"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notify } from "@/components/Notification";
import ActionBar from "@/components/ActionBar";
import MarkdownHelp from "@/components/MarkdownHelp";
import MarkdownEditor from "@/components/MarkdownEditor";
import { getCurrentDate } from "@/app/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Create = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tagInputValue, setTagInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const { currentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: name,
          author: currentUser.username,
          description: desc,
          createdAt: getCurrentDate(),
          updatedAt: getCurrentDate(),
          tags: tags,
        }),
      });

      if (response.ok) {
        notify("Blog added successfully");
      } else {
        notify("Failed to add blog");
      }
      router.back();
    } catch (error) {
      console.error("Error adding document: ", error);
      notify("Error creating blog", "error");
    }
  };

  const handleCancel = () => {
    setName("");
    router.back();
  };

  const handleTagInputChange = (event) => {
    setTagInputValue(event.target.value);
  };

  const handleTagInputKeyPress = (event) => {
    if (event.key === "Enter") event.preventDefault();
    if (
      event.key === " " ||
      (event.key === "Enter" && tagInputValue.trim() !== "")
    ) {
      event.preventDefault();
      if (!tags.includes(tagInputValue.trim())) {
        setTags([...tags, tagInputValue.trim()]);
      }
      setTagInputValue("");
    }
  };

  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((existingTag) => existingTag !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <>
      <div className="w-full">
        <ActionBar
          title={"Blogs"}
          actions={{
            Cancel: "/blogs",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full md:w-[60rem] p-2 mt-10">
        <h1 className="text-4xl my-4 w-full">Create a new blog</h1>
        <MarkdownHelp />

        <div className="flex flex-wrap md:flex-nowrap w-full justify-between items-center">
          <div className="flex items-center space-x-2 mx-2 mb-2 w-full ">
            <span className="font-bold text-blue-400">
              <Link href="/projects">Blogs</Link>
            </span>
            <span>/</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="bg-black rounded-md border resize-none w-full py-0.5 px-1 font-bold border-zinc-600 focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex space-x-2 py-2 w-full justify-end mb-2 rounded-md">
            <div
              onClick={handleCancel}
              className="bg-zinc-900 px-2 py-0.5 w-40 text-center rounded-sm hover:bg-zinc-800"
            >
              Cancle
            </div>
            <button
              type="submit"
              className="bg-green-800 px-2 py-0.5 w-40 text-center font-bold rounded-sm hover:bg-green-900"
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex justify-start items-center w-full">
          <input
            type="text"
            placeholder="Tags"
            value={tagInputValue}
            onChange={handleTagInputChange}
            inputMode="text"
            onKeyDown={handleTagInputKeyPress}
            className="rounded border border-zinc-600 mx-2 px-2 py-0 w-32 bg-black text-white my-2 focus:outline-none"
          />
          <div className="flex flex-wrap space-x-2 items-center ">
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

        <div className="text-xs mb-6 indent-2">
          <div>
            <strong>Hint: </strong>Press{" "}
            <span className="hidden md:inline"> space </span>{" "}
            <span className="md:hidden">enter</span> to add a tag.
          </div>
          <div className="indent-9">Click on the tag to remove it.</div>
        </div>

        <MarkdownEditor desc={desc} setDesc={setDesc} />
      </form>
    </>
  );
};

export default Create;
