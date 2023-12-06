import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDFEjhFeph-w-qIR9FZ8JQDwXN7YQyAOf0",
    authDomain: "news-a82b2.firebaseapp.com",
    projectId: "news-a82b2",
    storageBucket: "news-a82b2.appspot.com",
    messagingSenderId: "277299928820",
    appId: "1:277299928820:web:868d32d2d8c08a1956c8a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);