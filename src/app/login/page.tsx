import React from "react";
import Google from "./google";

const page = () => {
  return (
    <div className="flex absolute w-full min-h-screen justify-center items-center">
      <div className="border border-sky-950 w-60">
        <header className="w-full p-2 bg-sky-950">Sign In</header>
        <main className="p-4">
            <Google />
        </main>
      </div>
    </div>
  );
};

export default page;
