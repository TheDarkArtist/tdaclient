"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Google = () => {
  const { status } = useSession();
  if ((status === "authenticated")) redirect("/");
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex items-center gap-2 bg-blue-800 w-full px-4 py-2"
    >
      <Image
        src={
          "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
        }
        height={32}
        width={32}
        alt="google"
      />
      <p className="text-xl">Google</p>
    </button>
  );
};

export default Google;
