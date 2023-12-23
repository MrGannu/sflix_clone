// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-PM0bH_kL_cBdwf_Pyo2pHmAw3GV-M0c",
  authDomain: "sflix-database.firebaseapp.com",
  databaseURL: "https://sflix-database-default-rtdb.firebaseio.com",
  projectId: "sflix-database",
  storageBucket: "sflix-database.appspot.com",
  messagingSenderId: "670468382800",
  appId: "1:670468382800:web:1c87f25d368ca7abc57155"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const movieRef = collection(db, "movies")


export default app