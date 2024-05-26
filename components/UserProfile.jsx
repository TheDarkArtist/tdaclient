import Image from "next/image";
import React from "react";

const UserProfile = ({userData}) => {
  return (
    <div className="flex flex-col py-4 items-center md:max-w-[30%] w-full  md:mr-4 ">
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center rounded-full h-32 w-32 border border-stone-600">
          <Image
            src={"/logo.png"}
            width={100}
            height={100}
            alt="user profile image"
          />
        </div>
        <div className="flex flex-col my-2">
          <span className="text-[200%] font-bold">Kushagra Sharma</span>
          <span className="font-light">{userData.username}</span>
        </div>
        <div className="flex w-full flex-col  my-2 ">
          <span className="text-sm px-1">{userData.email}</span>
          <span className="text-sm px-1">https//thedarkartist.in</span>
        </div>
        <div className="bg-zinc-800 border border-stone-600 rounded-md py-0.5 px-28 my-4">
          Edit
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
