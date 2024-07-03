import React from "react";

const ProjectTag = ({ tag }: { tag: string }) => {
  return (
    <>
      <span className="flex justify-center items-center hover:animate-bounce relative h-6 min-w-10 pt-[2px] pb-[1px] px-[1px] overflow-hidden rounded-full">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--sky-500),var(--blue-900),var(--cyan-500))]" />
        <span className="flex text-xs justify-center my-px items-center dark:bg-slate-950 bg-white w-full h-full px-3 z-20 rounded-full">
          {tag || "lang"}
        </span>
      </span>
    </>
  );
};

export default ProjectTag;
