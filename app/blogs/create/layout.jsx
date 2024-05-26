import React from "react";

export const metadata = {
  title: "Create a Blog",
  description: "Start blogging and share your stories with our community. Create, publish, and connect with like-minded individuals to make your voice heard online. Markdown is supported, making it easy to format your posts just the way you want.",
};

const layout = ({ children }) => {
  return <div className='flex flex-col items-center justify-center w-full' >{children}</div>;
};

export default layout;
