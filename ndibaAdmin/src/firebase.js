import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'; // Import for Realtime Database
import { getStorage } from 'firebase/storage';   // Import for Firebase Storage
import { getFirestore } from 'firebase/firestore'; // Import for Firestore

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    databaseURL: `${process.env.REACT_APP_DATABASE_URL}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app); // Initialize Realtime Database

// Initialize Firebase Storage
const storage = getStorage(app);   // Initialize Firebase Storage

// Initialize Firestore
const db = getFirestore(app);       // Initialize Firestore

export { database, storage, db }; // Export Realtime Database, Firebase Storage, and Firestore
