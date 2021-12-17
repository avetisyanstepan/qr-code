import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuko-u_umgDp3pR4EWA21DaWlY6_KSzZI",
  authDomain: "qr-code-be45e.firebaseapp.com",
  projectId: "qr-code-be45e",
  storageBucket: "qr-code-be45e.appspot.com",
  messagingSenderId: "372594730972",
  appId: "1:372594730972:web:42fdd48397c35bc89ed119"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth =  getAuth(app)