import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "@/firebaseConfig";

export async function GET() {
  try {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "projects"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return Response.json(list);
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err;
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const docRef = await addDoc(collection(db, "projects"), data);
    console.log("Document written with ID: ", docRef.id);
    return Response.json({
      success: true,
      message: "project created successfully",
    });
  } catch (err) {
    console.error("Error adding project:", err);
    throw err;
  }
}
