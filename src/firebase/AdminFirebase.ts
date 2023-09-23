import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as fireStore from "firebase/firestore";
import * as firebaseStorage from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUQBt_urTxIuz45_z-qGyiqAq_4bmahpw",
  authDomain: "robotanium-admin.firebaseapp.com",
  projectId: "robotanium-admin",
  storageBucket: "robotanium-admin.appspot.com",
  messagingSenderId: "345997456064",
  appId: "1:345997456064:web:b80e656cf0ea0b893df325",
  measurementId: "G-CJKNBH9W2B",
};

// Initialize Firebase
export const App = firebaseApp.initializeApp(firebaseConfig);
export const Auth = firebaseAuth.getAuth(App);
export const db = fireStore.getFirestore(App);
export const Storage = firebaseStorage.getStorage(App);
