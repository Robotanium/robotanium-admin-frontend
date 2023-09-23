import { db } from "./AdminFirebase";
import { collection } from "firebase/firestore";

export const gamesRef = collection(db, "games");
