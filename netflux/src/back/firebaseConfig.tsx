import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2AslfRDgksAjaytOdlCgiYznbIhOtV9g",
  authDomain: "netfluxlog.firebaseapp.com",
  projectId: "netfluxlog",
  storageBucket: "netfluxlog.appspot.com",
  messagingSenderId: "126822541831",
  appId: "1:126822541831:web:bf643c0a21621b600f18a2",
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
