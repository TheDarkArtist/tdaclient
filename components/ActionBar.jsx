import React from "react";
import Link from "next/link";

const ActionBar = ({ title, actions }) => {
  return (
    <div>
      <div className="fixed flex items-center justify-between bg-green-800 h-10 w-full px-4 bg-opacity-50 backdrop-filter backdrop-blur-sm z-30">
        <div className="space-x-2">
          <Link className="hover:text-red-400" href={`/${title.toLowerCase()}`}>{title}</Link>
        </div>
        <menu className="flex space-x-2 ">
          {Object.keys(actions).map((label) => (
            <Link key={label} href={actions[label]}>
              {label}
            </Link>
          ))}
        </menu>
      </div>
    </div>
  );
};

export default ActionBar;
