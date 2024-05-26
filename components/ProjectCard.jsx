import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Ravi_Prakash } from "next/font/google";

const nabla = Ravi_Prakash({ subsets: ["latin"], weight: "400" });

const ProjectCard = ({ project }) => {
  const { name, createdAt, updatedAt, languages, frameworks } = project;

  return (
    <Link className="md:w-min w-full" href={`/projects/${project.id}`}>
      <motion.div
        className="rounded border border-sky-800 hover:border-green-800  overflow-hidden shadow-sm shadow-cyan-950  backdrop-filter bg-opacity-20 backdrop-blur-sm bg-black w-full md:w-[22rem]"
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      >
          <div className="px-6 py-4">
            <div
              className={`font-bold text-green-900  ${nabla.className}  text-4xl mb-2`}
            >
              {name}
            </div>
            <p className="text-gray-700 text-base">
              <strong>Created:</strong> {createdAt}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Last Updated:</strong> {updatedAt}
            </p>
            <div className="mt-2">
              <strong className="text-sky-600">Languages:</strong>{" "}
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="mr-2 bg-blue-900 bg-opacity-10 border border-blue-950 text-stone-200 rounded-full px-2 py-1/2 text-sm text-nowrap"
                >
                  {lang}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <strong className="text-orange-600">Frameworks:</strong>{" "}
              {frameworks.map((framework) => (
                <span
                  key={framework}
                  className="mr-2 bg-green-900 bg-opacity-10 border border-green-950 text-stone-200 rounded-full px-2 py-1/2 text-sm text-nowrap"
                >
                  {framework}
                </span>
              ))}
            </div>
          </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
