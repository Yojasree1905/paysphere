/**
 * PaySphere Firebase, Auth & Cloud Firestore Configuration
 * ---------------------------------------------------------
 * Target Firebase Project: paysphere-7be2b
 */
const firebaseConfig = {
  apiKey: "AIzaSyBoCcFd7IWpl3Z0L1P3iJ1csMQbYWrPOWI",
  authDomain: "paysphere-7be2b.firebaseapp.com",
  projectId: "paysphere-7be2b",
  storageBucket: "paysphere-7be2b.firebasestorage.app",
  messagingSenderId: "78446401809",
  appId: "1:78446401809:web:2a192e1fbf0753a66314b0",
  measurementId: "G-71TW0HTWFB"
};

// Initialize Firebase App, Auth & Firestore
let db = null;
let auth = null;

if (typeof firebase !== 'undefined') {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        auth = firebase.auth();
        console.log("[PaySphere Firebase] Connected to Firebase Auth & Cloud Firestore (paysphere-7be2b).");
    } catch (e) {
        console.warn("[PaySphere Firebase] Error initializing Firebase:", e);
    }
}
