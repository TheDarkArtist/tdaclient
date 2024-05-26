"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notify } from "@/components/Notification";
import ActionBar from "@/components/ActionBar";
import MarkdownHelp from "@/components/MarkdownHelp";
import { useAuth } from "@/contexts/AuthContext";
import { getCurrentDate } from "@/app/utils";
import MarkdownEditor from "@/components/MarkdownEditor";
import { useRouter } from "next/navigation";

const Create = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [langInputValue, setLangInputValue] = useState("");
  const [frameInputValue, setFrameInputValue] = useState("");
  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);

  const { currentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
          createdAt: getCurrentDate(),
          updatedAt: getCurrentDate(),
          languages: languages,
          frameworks: frameworks,
        }),
      });

      if (response.ok) {
        notify("Project added successfully");
      } else {
        notify("Failed to add project");
      }
      router.back();
    } catch (error) {
      console.error("Error adding document: ", error);
      notify("Error creating project", "error");
    }
  };

  const handleCancel = () => {
    setName("");
    window.history.back();
  };

  const handleFrameInputChange = (event) => {
    setFrameInputValue(event.target.value);
  };

  const handleLangInputChange = (event) => {
    setLangInputValue(event.target.value);
  };

  const handleLangInputKeyPress = (event) => {
    if (event.key === "Enter") event.preventDefault();
    if (
      event.key === " " ||
      (event.key === "Enter" && langInputValue.trim() !== "")
    ) {
      event.preventDefault();
      if (!languages.includes(langInputValue.trim())) {
        setLanguages([...languages, langInputValue.trim()]);
      }
      setLangInputValue("");
    }
  };

  const handleFrameInputKeyPress = (event) => {
    if (event.key === "Enter") event.preventDefault();
    if (
      event.key === " " ||
      (event.key === "Enter" && frameInputValue.trim() !== "")
    ) {
      event.preventDefault();
      if (!frameworks.includes(frameInputValue.trim())) {
        setFrameworks([...frameworks, frameInputValue.trim()]);
      }
      setFrameInputValue("");
    }
  };

  const toggleLanguage = (language) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter((lang) => lang !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  const toggleFramework = (framework) => {
    if (frameworks.includes(framework)) {
      setFrameworks(frameworks.filter((fram) => fram !== framework));
    } else {
      setFrameworks([...frameworks, framework]);
    }
  };

  return currentUser && currentUser.root ? (
    <>
      <div className="w-full">
        <ActionBar
          title={"Projects"}
          actions={{
            Cancel: "/projects",
          }}
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full md:w-[60rem] p-2 mt-10">
        <h1 className="text-4xl my-4 w-full">Create a new project</h1>
        <MarkdownHelp />
        <div className="flex flex-wrap md:flex-nowrap w-full justify-between items-center">
          <div className="space-x-2 space-y-2 mx-2 mb-2 w-full">
            <span className="font-bold text-blue-400">
              <Link href="/projects">Projects</Link>
            </span>
            <span>/</span>
            <input
              autoFocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              inputMode="text"
              className="bg-black rounded-md border w-40 py-0.5 px-1 font-bold border-zinc-600 focus:outline-none"
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
            <button
              onClick={handleSubmit}
              className="bg-green-800 px-2 py-0.5 w-40 text-center font-bold rounded-sm hover:bg-green-900"
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex justify-start items-center w-full mt-2">
          <input
            type="text"
            placeholder="Languages"
            value={langInputValue}
            onChange={handleLangInputChange}
            onKeyDown={handleLangInputKeyPress}
            inputMode="text"
            className="rounded border border-zinc-600 mx-2 px-2 py-0 w-32 bg-black text-white my-2 focus:outline-none"
          />
          <div className="flex flex-wrap space-x-2 items-center ">
            <h3 className="">Languages:</h3>
            {languages.map((language, index) => (
              <span
                key={index}
                onClick={() => toggleLanguage(language)}
                className={`cursor-pointer ${languages.includes(language) ? "text-white" : "text-gray-800"} flex flex-wrap rounded-full h-4 bg-blue-950 text-sm py-1/2 px-2 my-0.5`}
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-start items-center  w-full  mb-6">
          <input
            type="text"
            placeholder="Frameworks"
            value={frameInputValue}
            onChange={handleFrameInputChange}
            onKeyDown={handleFrameInputKeyPress}
            className="rounded border border-zinc-600 w-32 mx-2 px-2 py-0 bg-black text-white my-2 focus:outline-none"
          />
          <div className="flex flex-wrap space-x-2 items-center">
            <h3 className="">Frameworks:</h3>
            {frameworks.map((framework, index) => (
              <span
                key={index}
                onClick={() => toggleFramework(framework)}
                className={`cursor-pointer ${framework.includes(framework) ? "text-white" : "text-gray-800"} rounded-full h-4 bg-blue-950 text-sm py-1/2 px-2 my-0.5`}
              >
                {framework}
              </span>
            ))}
          </div>
        </div>

        <MarkdownEditor desc={desc} setDesc={setDesc} />
      </form>
    </>
  ) : (
    <div>NOT AUTHORIZED</div>
  );
};

export default Create;
