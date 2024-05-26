import React from "react";

export const generateMetadata = () => {
  return {
    title: "Projects",
    description: "Explore the projects!",
    metadataBase: new URL("https://thedarkartist.in/projects"),
  };
};

const layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center mt-15 overflow-hidden">
        {children}
      </div>
    </>
  );
};

export default layout;
