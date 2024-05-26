import React from "react";

export const metadata= {
  title: "Blogs",
  description: "Explore my blogs!",
      metadataBase: new URL("https://thedarkartist.in/blogs"),

};

const layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col items-center">{children}</div>
    </>
  );
};

export default layout;
