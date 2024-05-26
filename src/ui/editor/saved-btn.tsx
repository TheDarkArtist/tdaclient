import React from "react";

const SavedBtn = ({ isPendingSaving }: { isPendingSaving: boolean }) => {
  return (
    <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
      {isPendingSaving ? "Saving..." : "Saved"}
    </div>
  );
};

export default SavedBtn;
