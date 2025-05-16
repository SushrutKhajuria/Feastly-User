// src/services/categoryService.js
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const categoryRef = collection(db, "categories");

export const getCategories = async () => {
  const snapshot = await getDocs(categoryRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
