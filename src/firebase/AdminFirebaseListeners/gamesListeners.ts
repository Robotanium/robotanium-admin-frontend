import { db } from "../AdminFirebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { store } from "../../Store/store";
import { setGames } from "../../Store/Reducers";
import { IDataBaseGame, IFirebaseUser, IGame } from "../../Models";

export class listenForGames {
  dates = store.getState().games.creatGame;
  gamesRef = collection(db, "games");
  q = query(this.gamesRef);

  unsubscribe = onSnapshot(this.q, (snapshot) => {
    const games = snapshot.docs.map((game) => {
      const gameData = game.data() as IGame;
      const newGame: IDataBaseGame = {
        id: game.id.toString(),
        ...gameData,
      };
      console.log(newGame);
      return newGame;
    });
    store.dispatch(setGames(games));
  });

  resetlistener = () => {
    this.unsubscribe();
  };
}
