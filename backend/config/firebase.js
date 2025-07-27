import admin from 'firebase-admin';

// eslint-disable-next-line no-undef
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db }