"use client";

import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { RotatingLines } from "react-loader-spinner";

import { db } from "@/firebaseConfig";
import Search from "@/components/Search";
import ProjectCard from "@/components/ProjectCard";
import ActionBar from "@/components/ActionBar";
import { useLoading } from "@/contexts/LoadingContext";
import { useAuth } from "@/contexts/AuthContext";
import { Open_Sans } from "next/font/google";
import Image from "next/image";

const os = Open_Sans({ subsets: ["latin"], weight: "300" });

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { loading, setLoading } = useLoading();
  const [animate, setAnimate] = useState(false);

  const { currentUser } = useAuth();

  const onSearch = useCallback(
    (searchTerm) => {
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(searchTerm === "" ? projects : filtered);
    },
    [projects]
  );

  useEffect(() => {
    const fetchProjects = async () => {
      let list = [];
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProjects(list);
        setFilteredProjects(list);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [setLoading]);

  const animateProjectCard = () => {
    setAnimate(true);
  };

  return (
    <>
      <div className="z-30 w-full">
        <ActionBar
          title={"Projects"}
          actions={
            currentUser && currentUser.root
              ? {
                  Create: "/projects/create",
                }
              : {}
          }
        />
      </div>

      <div className="md:max-w-[80rem] w-full my-10">
        <div className="flex w-full flex-col">
          <div className={`xs:px-6 px-2 md:px-20 ${os.className}`}>
            <h1 className="text-4xl font-bold py-4">
              Welcome to my projects page!{" "}
            </h1>
            <p>
              This is my personal space where I showcase my self-developed
              projects and blog about my private coding adventures.
            </p>

            <p>
              It’s updated when I feel like posting bigger news to the world,
              for more frequent and smaller updates, follow me on Instagram or
              X.
            </p>

            <p>
              All of my public source are available over at my github
              repository.
            </p>
          </div>

          <div className="flex justify-center my-10 w-full">
            <Search parameter={"Projects"} onSearch={onSearch} />
          </div>
          {loading ? (
            <div className="flex justify-center">
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
            <div className="flex flex-wrap justify-center py-10">
              <div
                className="flex flex-wrap items-center sm:max-w-[30rem] md:max-w-[45rem] lg:max-w-[68rem] gap-4 mx-4 bg-cover bg-center"
                style={{ backgroundImage: "url('/generated2.jpg')" }}
              >
                {projects
                  ? filteredProjects.map((project, index) => (
                      <ProjectCard key={index} project={project} />
                    ))
                  : "++ NO PROJECTS ++"}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
