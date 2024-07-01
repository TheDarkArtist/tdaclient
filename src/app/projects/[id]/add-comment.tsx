"use client";
import { signIn, useSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useRef, useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { addComment } from "@/lib/actions/projects";

const AddComment = ({ params }: { params: Params }) => {
  const [comment, setComment] = useState<string>("");
  const [viewComment, setViewComment] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (viewComment && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [viewComment]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!comment.trim()) {
        return;
      }

      await addComment(comment, session?.user?.id ?? "", params.id as string);

      setComment("");
      setViewComment(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="my-4">
      <div
        onClick={() => {
          if (status !== "authenticated") {
            signIn("google");
          } else {
            setViewComment((prev) => !prev);
          }
        }}
        className={`px-4 py-2 my-4 w-[90%] text-stone-400 mx-auto text-left rounded-full border dark:border-stone-800 border-stone-400 ${viewComment ? "hidden" : ""} cursor-text`}
      >
        Add a comment
      </div>
      <form
        onSubmit={handleSubmit}
        className={`my-4 space-y-4 w-[90%] mx-auto border dark:border-stone-800 border-stone-400 rounded-2xl p-4 ${viewComment ? "" : "hidden"}`}
      >
        <TextareaAutosize
          className="dark:bg-stone-800/80 bg-stone-800/20 px-4 py-2 resize-none rounded-md w-full focus:outline-none"
          ref={commentInputRef}
          autoFocus={false}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-4 justify-between w-full">
          <div className="flex flex-col md:flex-row md:gap-4 text-xs md:text-sm">
            <span>{comment.length} chars</span>
            <span>{comment.split(" ").length - 1} words</span>
          </div>
          <span className="space-x-4">
            <button
              type="button"
              onClick={() => setViewComment(false)}
              className="border border-stone-600 py-1 px-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 py-1 px-2 rounded-md text-white"
            >
              Comment
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
