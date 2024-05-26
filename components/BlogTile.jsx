import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

const BlogTile = ({ blog }) => {
  const {
    id,
    title,
    author,
    createdAt,
    updatedAt,
    description,
    imageUrl,
    tags,
  } = blog;
  function capitalizeFirstLetter(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  return (
    <Link href={`/blogs/${id}`}>
      <div className="border border-gray-600 hover:border-green-800 text-sm bg-black backdrop-filter bg-opacity-20 hover:bg-gray-950 backdrop-blur-2xl rounded-sm shadow-md shadow-stone-500 hover:shadow-green-800 relative overflow-hidden m-3">
        <div className="p-4">
          <div className="break-all">
            <p className="text-stone-300 font-bold text-[1rem] md:text-xl">
              {capitalizeFirstLetter(title.substring(0, 200))}
              {capitalizeFirstLetter(title.substring(80, 82)) && "..."}
            </p>
          </div>
          <div className="my-2">
            <p className="text-xs text-gray-300">By {author}</p>
            <p className="text-xs text-gray-300">
              created: {createdAt} | update: {updatedAt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="border border-gray-800 text-gray-200 px-2 py-1 mt-1 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="my-2 flex m-1">
            <ReactMarkdown className={"no-image whitespace-normal text-stone-200 text-sm"}>
              {description && description.substring(0, 400)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogTile;
