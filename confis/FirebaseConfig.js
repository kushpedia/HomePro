// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBT06pYb5vnPLTttqs7ZQY93Z0tNfjRiVw",
	authDomain: "homepro-be66f.firebaseapp.com",
	projectId: "homepro-be66f",
	storageBucket: "homepro-be66f.appspot.com",
	messagingSenderId: "267224369640",
	appId: "1:267224369640:web:bec9631d76adbf4db17c5d",
	measurementId: "G-J9N43GBZGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);