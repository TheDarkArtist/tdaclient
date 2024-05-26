"use client";

import UserProfile from "@/components/UserProfile";
import UserBio from "@/components/UserBio";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Open_Sans } from "next/font/google";
import React, { useCallback, useEffect, useState } from "react";

const os = Open_Sans({ subsets: ["latin"], weight: "300" });
const Page = ({ params }) => {
  const [userData, setUserData] = useState([]);

  const getUserId = useCallback(async () => {
    const q = query(
      collection(db, "users"),
      where("username", "==", params.username)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data().uid;
  }, [params.username]);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getUserId();
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    fetchData();
  }, [getUserId]);

  return (
    <div className={`flex flex-wrap ${os.className} `}>
      <UserProfile userData={userData} />
      <UserBio />
    </div>
  );
};

export default Page;
