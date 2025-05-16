// src/services/recipeService.js
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const recipeRef = collection(db, "recipes");

export const getRecipes = async () => {
  const snapshot = await getDocs(recipeRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
