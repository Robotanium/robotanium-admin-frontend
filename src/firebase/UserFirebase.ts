import * as firebaseApp from "firebase/app";
import * as firebaseDatabase from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiCU5Y7E_mO2v9-wU17m6JvqaAOQy0zko",
  authDomain: "rawbotz-46ddb.firebaseapp.com",
  databaseURL:
    "https://rawbotz-46ddb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rawbotz-46ddb",
  storageBucket: "rawbotz-46ddb.appspot.com",
  messagingSenderId: "1091073924324",
  appId: "1:1091073924324:web:bcb52d42b8171b48a960f1",
  measurementId: "G-NQLZ1GG6S4",
};

const app = firebaseApp.initializeApp(firebaseConfig);
const database = firebaseDatabase.getDatabase(app);
const storage = getStorage(app);

export { app, database, storage };