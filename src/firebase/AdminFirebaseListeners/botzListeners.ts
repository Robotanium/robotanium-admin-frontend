import { db } from '../AdminFirebase'
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { store } from '../../Store/store'
import { setTankBotzArray } from '../../Store/Reducers';
import { ITankBot } from '../../Models/Bots';

export class BotzListener {

  dates = store.getState().games.creatGame;
  botzRef = collection(db, 'botz');
  q = query(this.botzRef);

  unsubscribe:any;
  constructor() {
    this.unsubscribe = onSnapshot(this.q, (snapshot) => {
      const botz = snapshot.docs.map((bot) => {
        const botData = bot.data() as ITankBot;
        const newBot: ITankBot = {
          ...botData
        }
        return newBot;
      })
      store.dispatch(setTankBotzArray(botz))
    });
  }

  resetlistener = () => {
    this.unsubscribe();
    
  }

}