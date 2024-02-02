// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDTxPa38v0PoV7riUHkIg70sNv8k3S0S4",
    authDomain: "v-chat-70f58.firebaseapp.com",
    projectId: "v-chat-70f58",
    storageBucket: "v-chat-70f58.appspot.com",
    messagingSenderId: "955028217006",
    appId: "1:955028217006:web:436c47ac8b657f230de13f",
};

// Initialize Firebase
// const app = 
initializeApp(firebaseConfig);

// Initialize Firestore Server
const db = getFirestore();
export default db;