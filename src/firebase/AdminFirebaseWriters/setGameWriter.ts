import { setDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../AdminFirebase";
import { IDataBaseGame, IGame } from "../../Models";
import { gamesRef } from "../collections";

export const saveNewGametoDataBase = async (game: IGame): Promise<boolean> => {
  return await addDoc(gamesRef, {
    ...game,
  })
    .then(() => {
      console.log("saved");
      return true;
    })
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });
};
