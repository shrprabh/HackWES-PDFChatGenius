// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "hackwest-dee28.firebaseapp.com",
  projectId: "hackwest-dee28",
  storageBucket: "hackwest-dee28.appspot.com",
  messagingSenderId: "88266854351",
  appId: "1:88266854351:web:1e4ae0934c161d7f2eccba",
  measurementId: "G-CW0JLWF8SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);