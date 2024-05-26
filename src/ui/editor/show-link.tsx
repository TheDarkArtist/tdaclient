import React from "react";
import Link from "next/link";
import { LuExternalLink } from "react-icons/lu";

const ShowLink = ({ id, published }: { id: string; published: boolean }) => {
  return (
    published && (
      <Link
        href={`/articles/${id}`}
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
      >
        <LuExternalLink className="h-4 w-4" />
      </Link>
    )
  );
};

export default ShowLink;
