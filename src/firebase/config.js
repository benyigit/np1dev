import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)

// Storage servisi (Cloudinary kullanıldığı için devre dışı)
// export const torage = getStorage(app)

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
