import {getDocs, collection} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export async function GET() {
  try {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "messages"));
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });
    return Response.json(list);
  } catch (err) {
    console.error("Error fetching messages:", err);
    throw err;
  }
}
