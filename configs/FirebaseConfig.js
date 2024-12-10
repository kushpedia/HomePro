// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	
	authDomain: "homepro-be66f.firebaseapp.com",
	projectId: "homepro-be66f",
	storageBucket: "homepro-be66f.appspot.com",
	messagingSenderId: "267224369640",
	appId: "1:267224369640:web:bec9631d76adbf4db17c5d",
	measurementId: "G-J9N43GBZGQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
