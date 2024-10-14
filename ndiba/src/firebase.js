// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import for Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyAwloRbovM01UnYW_waftLhk0G1W0ED3hE",
    authDomain: "ndiba-a4f3c.firebaseapp.com",
    databaseURL: "https://ndiba-a4f3c-default-rtdb.firebaseio.com",
    projectId: "ndiba-a4f3c",
    storageBucket: "ndiba-a4f3c.appspot.com",
    messagingSenderId: "368271422739",
    appId: "1:368271422739:web:ea3c676a31f5f52f6596e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app); // Initialize Realtime Database

export { database }; // Export the Realtime Database instance