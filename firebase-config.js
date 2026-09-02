/**
 * PaySphere Firebase, Auth, Firestore & Realtime Database Configuration
 * ----------------------------------------------------------------------
 * Target Firebase Project: paysphere-7be2b
 */
const firebaseConfig = {
  apiKey: "AIzaSyBoCcFd7IWpl3Z0L1P3iJ1csMQbYWrPOWI",
  authDomain: "paysphere-7be2b.firebaseapp.com",
  databaseURL: "https://paysphere-7be2b-default-rtdb.firebaseio.com",
  projectId: "paysphere-7be2b",
  storageBucket: "paysphere-7be2b.firebasestorage.app",
  messagingSenderId: "78446401809",
  appId: "1:78446401809:web:2a192e1fbf0753a66314b0",
  measurementId: "G-71TW0HTWFB"
};

// Initialize Firebase Services
let db = null;
let auth = null;
let rtdb = null;
let analytics = null;

const ensureFirebaseCollections = async () => {
    if (typeof firebase === 'undefined' || !firebase.apps || !firebase.apps.length || !firebase.firestore) {
        return false;
    }

    const firestore = firebase.firestore();
    const seedDocs = [
        {
            collection: "users",
            docId: "__system__",
            payload: {
                uid: "system",
                email: "admin@paysphere.local",
                role: "system",
                created_at: new Date().toISOString(),
                initialized: true
            }
        },
        {
            collection: "transactions",
            docId: "__seed__",
            payload: {
                id: "__seed__",
                type: "system",
                note: "PaySphere transaction collection seed",
                created_at: new Date().toISOString(),
                initialized: true
            }
        },
        {
            collection: "high_risk_transactions",
            docId: "__seed__",
            payload: {
                id: "__seed__",
                type: "system",
                note: "PaySphere high-risk transaction collection seed",
                created_at: new Date().toISOString(),
                initialized: true
            }
        },
        {
            collection: "security_logs",
            docId: "__system__",
            payload: {
                event: "firebase_init",
                created_at: new Date().toISOString(),
                initialized: true
            }
        },
        {
            collection: "wallet_settings",
            docId: "__system__",
            payload: {
                default_currency: "USD",
                risk_threshold: 70,
                created_at: new Date().toISOString(),
                initialized: true
            }
        }
    ];

    const results = await Promise.allSettled(
        seedDocs.map(({ collection, docId, payload }) =>
            firestore.collection(collection).doc(docId).set(payload, { merge: true })
        )
    );

    const failed = results.filter(r => r.status === 'rejected');
    if (failed.length) {
        console.warn("[PaySphere Firebase] Some initial collection seeds failed:", failed);
    }

    console.log("[PaySphere Firebase] Firestore collections ready: users, transactions, security_logs, wallet_settings");
    return true;
};

if (typeof firebase !== 'undefined') {
    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.firestore();
        auth = firebase.auth();

        if (auth && !auth.currentUser) {
            auth.signInAnonymously().then(() => {
                console.log("[PaySphere Firebase] Anonymous demo auth created for Firestore writes.");
            }).catch((anonErr) => {
                console.warn("[PaySphere Firebase] Anonymous auth fallback failed:", anonErr);
            });
        }

        if (typeof firebase.database === 'function') {
            rtdb = firebase.database();
        }
        if (typeof firebase.analytics === 'function') {
            analytics = firebase.analytics();
        }

        ensureFirebaseCollections();
        console.log("[PaySphere Firebase] Connected to Firebase Auth, Cloud Firestore, Realtime Database & Analytics (paysphere-7be2b).");
    } catch (e) {
        console.warn("[PaySphere Firebase] Error initializing Firebase services:", e);
    }
}

window.PaySphereFirebase = {
    firebaseConfig,
    db,
    auth,
    rtdb,
    analytics,
    ensureFirebaseCollections
};
