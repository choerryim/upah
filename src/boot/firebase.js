import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmTTnd6Zr2ftxVa-iCd-p62pggqMXQ_Cs",
  authDomain: "upah-6ff37.firebaseapp.com",
  projectId: "upah-6ff37",
  storageBucket: "upah-6ff37.appspot.com",
  messagingSenderId: "560457260861",
  appId: "1:560457260861:web:8fd13f26a08beef28c6f54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
