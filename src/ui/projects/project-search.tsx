"use client";

import { PlaceholdersAndVanishInput } from "../utils/placeholder-vanish-input";

export function ProjectSearch() {
  const placeholders = [
    "Search awesesome projects",
    "Write a Javascript method to reverse a string",
    "TheDjangoBlog"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[8rem] flex flex-col justify-center  items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
