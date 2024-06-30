import React from "react";

const Note = ({ note }: { note?: string }) => {
  return (
    <div className="flex flex-col rounded-xl border overflow-hidden dark:border-stone-700">
      <div className="px-4 py-2 bg-gray-300 dark:bg-red-950">Note</div>
      <div className="p-4 bg-white dark:bg-zinc-950">{note || ""}</div>
    </div>
  );
};

export default Note;
