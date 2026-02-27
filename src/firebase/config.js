import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase yapılandırması - codlyio projesi
const firebaseConfig = {
    apiKey: "AIzaSyB0HXl8tL21ZIQhMSL-wOLXzQwp5cpLcW4",
    authDomain: "codlyio.firebaseapp.com",
    projectId: "codlyio",
    storageBucket: "codlyio.firebasestorage.app",
    messagingSenderId: "991770723190",
    appId: "1:991770723190:web:31d77978afc08144e07057"
}

// Firebase'i başlat
const app = initializeApp(firebaseConfig)

// Auth servisi
export const auth = getAuth(app)

// Firestore servisi
export const db = getFirestore(app)

// Storage servisi (Cloudinary kullanıldığı için devre dışı)
// export const storage = getStorage(app)

// Google provider
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('profile')
googleProvider.addScope('email')
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

// Apple provider
export const appleProvider = new OAuthProvider('apple.com')
appleProvider.addScope('email')
appleProvider.addScope('name')

// Discord provider
export const discordProvider = new OAuthProvider('discord.com')
discordProvider.addScope('identify')
discordProvider.addScope('email')
discordProvider.addScope('guilds')
discordProvider.addScope('connections')

export default app
