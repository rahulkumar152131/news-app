import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDFNAXXzna7E-ciT1BKPkpOFi2rvB92fKU",
    authDomain: "news-766a3.firebaseapp.com",
    projectId: "news-766a3",
    storageBucket: "news-766a3.appspot.com",
    messagingSenderId: "154440280208",
    appId: "1:154440280208:web:560895c361884727041015"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);