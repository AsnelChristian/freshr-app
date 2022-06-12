import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDChvhs1zEu0V1DKMW6Vwun5oxo6a20qz0",
  authDomain: "freshr-44d1a.firebaseapp.com",
  projectId: "freshr-44d1a",
  storageBucket: "freshr-44d1a.appspot.com",
  messagingSenderId: "1095248180434",
  appId: "1:1095248180434:web:13b9d47fc844892f0a290b",
  measurementId: "G-7VWZGY53NB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const firebaseService = {
  app,
  auth,
};

export default firebaseService;
