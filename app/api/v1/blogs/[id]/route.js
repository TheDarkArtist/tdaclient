import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export async function GET(_request, { params }) {
  try {
    const docRef = doc(db, "blogs", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return Response.json(docSnap.data());
    } else {
      return Response.json({ error: "Blog not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const docRef = doc(db, "blogs", params.id);
    await updateDoc(docRef, data);

    return Response.json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

export async function DELETE(_request, { params }) {
  try {
    const docRef = doc(db, "blogs", params.id);
    await deleteDoc(docRef);
    return Response.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}
