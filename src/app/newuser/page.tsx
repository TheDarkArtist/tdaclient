import { updateUsername } from "@/lib/actions/utils";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("login");
  }

  if (session.user.username) {
    redirect("/");
  }

  const handleForm = async (formData: FormData) => {
    "use server";
    await updateUsername(
      session.user.email,
      formData.get("username") as string
    );
    redirect("/");
  };

  return (
    <div className="flex justify-center h-full">
      <div className="pt-20 md:pt-60 flex flex-col items-center gap-8 p-4 md:max-w-[60rem] w-full">
        <div className="max-w-80 text-stone-300 space-y-4">
          <div className="font-bold text-2xl">SET USERNAME</div>
          <div>
            In order for you to continue we require you to set a username
          </div>
          <div>
            It will be used across the webapp to identify you and will be
            visible on the blogs you create, comment on a blog or upvote a
            project etc.
          </div>
        </div>
        <form className="flex flex-col w-80 gap-4" action={handleForm}>
          <input
            className="p-2 bg-red-950 rounded-md focus:outline-none"
            type="text"
            name="username"
            placeholder="username"
          />
          <button
            disabled={session.user.username ? true : false}
            className="disabled:cursor-not-allowed px-6 py-2 bg-sky-900 rounded-md dark:hover:outline-red-900"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
