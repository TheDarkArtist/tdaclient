import React from "react";

const Note = ({ note }: { note?: string }) => {
  return (
    <div className="flex flex-col rounded-xl dark:bg-black border overflow-hidden dark:border-white/[.2]">
      <div className="border-b border-white/[.2] px-4 py-2">Note</div>
      <div className="p-4 bg-white dark:bg-zinc-950">{note || ""}</div>
    </div>
  );
};

export default Note;
