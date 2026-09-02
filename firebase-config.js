/**
 * PaySphere Firebase & Cloud Firestore Configuration
 * --------------------------------------------------
 * Replace the placeholder values below with your Firebase Project keys:
 * https://console.firebase.google.com/
 */
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "paysphere-app.firebaseapp.com",
    projectId: "paysphere-app",
    storageBucket: "paysphere-app.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase if Firebase SDK is present
let db = null;
if (typeof firebase !== 'undefined') {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        print("[PaySphere Firebase] Connected to Cloud Firestore successfully.");
    } catch (e) {
        console.warn("[PaySphere Firebase] Demo mode running without active Firebase credentials.", e);
    }
}
