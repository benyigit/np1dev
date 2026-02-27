import admin from 'firebase-admin';

// Vercel serverless function memory'sinde admin instance'ı kalabilir
if (!admin.apps.length) {
    try {
        let serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

        if (serviceAccount) {
            if (serviceAccount.startsWith("'") && serviceAccount.endsWith("'")) serviceAccount = serviceAccount.slice(1, -1);
            if (serviceAccount.startsWith('"') && serviceAccount.endsWith('"')) serviceAccount = serviceAccount.slice(1, -1);

            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(serviceAccount))
            });
        } else {
            console.error("FIREBASE_SERVICE_ACCOUNT missing");
        }
    } catch (error) {
        console.error('Firebase Admin Init Error:', error.message);
    }
}

export const db = admin.firestore();
