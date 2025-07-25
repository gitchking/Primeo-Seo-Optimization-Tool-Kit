// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTbieCZv2R7s1Ep-fYzMQ3Z46CJ4ZLpD0",
  authDomain: "primeo-fb205.firebaseapp.com",
  projectId: "primeo-fb205",
  storageBucket: "primeo-fb205.appspot.com",
  messagingSenderId: "564833515106",
  appId: "1:564833515106:web:6ae77973a1a588de82c33b",
  measurementId: "G-HY6P2SX29X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
