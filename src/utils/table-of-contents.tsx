"use client";
import React from "react";

interface TOCProps {
  content: string;
  navbarHeight: number; // Add navbarHeight as a prop
}

const TOC: React.FC<TOCProps> = ({ content, navbarHeight }) => {
  const extractHeadings = (content: string) => {
    const headings: { text: string; id: string }[] = [];
    const lines = content.split("\n");
    lines.forEach((line, index) => {
      if (line.startsWith("#")) {
        const headingText = line.replace(/^#+\s*/, "");
        const id = headingText.toLowerCase().replace(/\s+/g, "-");
        headings.push({ text: headingText, id });
      }
    });
    return headings;
  };

  const headings = extractHeadings(content);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed rounded-md p-4 mr-4 dark:bg-[#111111] bg-white">
      <h1 className="pb-4 text-2xl font-bold text-sky-600">Table of Contents</h1>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li key={index}>
            <button
              className="leading-5 text-left hover:underline text-cyan-600"
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOC;
