import React from "react";
export const generateMetadata = () => {
  return {
    title: "Update a blog",
    description: "you can update an existing blog from here",
  };
};

const layout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {children}
    </div>
  );
};

export default layout;
