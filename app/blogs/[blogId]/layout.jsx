import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

export const generateMetadata = async ({ params }) => {
  const docSnap = await getDoc(doc(db, "blogs", params.blogId));
  return {
    title: docSnap.data().title,
    description: docSnap.data().description,
    openGraph: {
      images: [
        {
          url: "/post-bg.jpeg",
        },
      ],
    },
  };
};

const layout = ({ children }) => {
  return (
    <>
      <div className="w-full">{children}</div>
    </>
  );
};

export default layout;
