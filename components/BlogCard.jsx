import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactMarkdown from "react-markdown";

const BlogCard = ({ blog }) => {
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
      <div className="border border-gray-600 hover:border-green-800 text-sm bg-black backdrop-filter w-[90vw] md:w-[28rem] md:h-[20rem] bg-opacity-20 hover:bg-gray-950 backdrop-blur-2xl rounded-lg shadow-md relative overflow-hidden m-3">
        <div className="relative group overflow-hidden">
          <Image
            src={!imageUrl && "/post-bg.jpeg"}
            width={600}
            height={600}
            alt={title}
            className="w-full max-h-32  object-center md:object-cover object-scale-down transition-transform duration-500 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center ">
            <h2 className="text-white md:text-lg text-2xl font-semibold p-4">
              {title.substring(0, 120)}
            </h2>
          </div>
        </div>
        <div className="p-4">
          <div className="break-all">
            <p className="text-stone-300 md:hidden font-bold text-xl ">
              {capitalizeFirstLetter(title.substring(0, 75))}
              {capitalizeFirstLetter(title.substring(80, 82)) && "..."}
            </p>
            <p className="text-stone-300 hidden md:inline font-bold text-xl">
              {capitalizeFirstLetter(title.substring(0, 95))}
              {capitalizeFirstLetter(title.substring(80, 82)) && "..."}
            </p>
          </div>
          <div className="mb-2">
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
            <ReactMarkdown className={"no-image text-stone-300 text-sm"}>
              {description && description.substring(0, 200)}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
