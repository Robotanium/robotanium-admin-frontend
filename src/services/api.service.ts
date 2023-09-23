import { current } from "@reduxjs/toolkit";
import { IGame, bookableDates, datesArray, saveGameDTO } from "../Models";

import axios from "axios";
import { ICreateTankBot } from "../Models/Bots";

const mode = process.env.REACT_APP_RUN_MODE;

const baseUrl = mode === "dev" ? "http://localhost:8080/api" : "https://rawbotz.com/api";

export const saveTankBot = async (tankBot: ICreateTankBot) => {
  console.log(process.env.REACT_APP_RUN_MODE);

  return await axios.post(`${baseUrl}/createtankbot`, tankBot);
};

export interface IConnectBotCredentials {
  botId: string;
  idToken: string;
  uid: string;
  email: string;
  sessionId: string;
}

export const getSessionAndAccessToken = async (credentials: IConnectBotCredentials) => {
  return (await axios.post(`${baseUrl}/botconnect`, credentials)).data;
};
