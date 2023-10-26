import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "netfluxlog.firebaseapp.com",
  projectId: "netfluxlog",
  storageBucket: "netfluxlog.appspot.com",
  messagingSenderId: "126822541831",
  appId: "1:126822541831:web:bf643c0a21621b600f18a2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const createUserDocument = async (user: any, additionalData: any) => {
  if (!user) return;

  const docRef = doc(firestore, "users", user.uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    if ("email" in user && "displayName" in additionalData) {
      const email = user.email;
      const displayName = additionalData.displayName;

      try {
        // Place the code to save user data to Firestore here
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error in creating user", error.message);
        } else {
          console.log("Error in creating user", error);
        }
      }
    }
  }
};
