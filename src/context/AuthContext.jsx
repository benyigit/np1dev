import { createContext, useContext, useState, useEffect } from 'react'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    linkWithPopup,
    linkWithRedirect,
    reauthenticateWithPopup,
    signOut,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
    OAuthProvider
} from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { auth, db, googleProvider, appleProvider, discordProvider } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)

    // Auth Initialization - SADECE BURASI
    useEffect(() => {
        let unsubscribe

        const initAuth = async () => {
            // Redirect sonucunu kontrol et (Safari vb. için)
            try {
                const redirectResult = await getRedirectResult(auth)
                if (redirectResult && redirectResult.user) {
                    console.log("Redirect login başarılı:", redirectResult.user.uid)
                    const existingData = await fetchUserData(redirectResult.user.uid)
                    if (!existingData) {
                        await createUserProfile(redirectResult.user.uid, {
                            email: redirectResult.user.email,
                            username: redirectResult.user.displayName?.replace(/\s/g, '').toLowerCase() || redirectResult.user.email?.split('@')[0] || 'user',
                            displayName: redirectResult.user.displayName || 'User',
                            photoURL: redirectResult.user.photoURL || '',
                            provider: redirectResult.providerId || 'google'
                        })
                    }
                    // User state onAuthStateChanged tarafından set edilecek ama veri çekmeyi garantiye aldık
                }
            } catch (error) {
                console.error("Redirect login hatası:", error)
            }

            // Auth listener'ı başlat
            unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser)

                if (currentUser) {
                    const data = await fetchUserData(currentUser.uid)

                    // Profil verisi yoksa oluştur (Self-healing)
                    if (!data) {
                        console.log("Kullanıcı profili bulunamadı, oluşturuluyor...")
                        await createUserProfile(currentUser.uid, {
                            email: currentUser.email,
                            username: currentUser.displayName?.replace(/\s/g, '').toLowerCase() || currentUser.email?.split('@')[0] || 'user',
                            displayName: currentUser.displayName || 'User',
                            photoURL: currentUser.photoURL || '',
                            provider: currentUser.providerData?.[0]?.providerId || 'email'
                        })
                    }
                } else {
                    setUserData(null)
                }

                setLoading(false)
            })
        }

        initAuth()

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    // Kullanıcı verilerini Firestore'dan al
    const fetchUserData = async (uid) => {
        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore fetch timeout')), 8000)
            )
            const userDoc = await Promise.race([
                getDoc(doc(db, 'users', uid)),
                timeoutPromise
            ])
            if (userDoc.exists()) {
                setUserData(userDoc.data())
                return userDoc.data()
            }
            return null
        } catch (error) {
            console.warn('Kullanıcı verileri alınamadı:', error)
            return null
        }
    }

    // Yeni kullanıcı profili oluştur
    const createUserProfile = async (uid, data) => {
        const userProfile = {
            uid,
            username: data.username || '',
            email: data.email || '',
            displayName: data.displayName || data.username || '',
            photoURL: data.photoURL || '',
            role: 'user', // varsayılan rol
            bio: '',
            discord: '',
            spotify: '',
            website: '',
            banner: '',
            accentColor: '#7c3aed',
            badges: [],
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }
        try {
            // Firestore yazma işlemine 10 saniye timeout ekle
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore timeout')), 10000)
            )
            await Promise.race([
                setDoc(doc(db, 'users', uid), userProfile),
                timeoutPromise
            ])
            setUserData(userProfile)
            return userProfile
        } catch (error) {
            console.warn('Profil Firestore\'a yazılamadı, yerel olarak kaydediliyor:', error)
            // Firestore başarısız olsa bile kullanıcı verisini local olarak ayarla
            setUserData({ ...userProfile, createdAt: new Date(), updatedAt: new Date() })
            return userProfile
        }
    }

    // Email/Password ile kayıt ol
    const register = async (email, password, username) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(result.user, { displayName: username })
            await createUserProfile(result.user.uid, {
                email,
                username,
                displayName: username,
                provider: 'email'
            })
            return result
        } catch (error) {
            throw error
        }
    }

    // Email/Password ile giriş yap
    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            await fetchUserData(result.user.uid)
            return result
        } catch (error) {
            throw error
        }
    }

    // Google ile giriş yap (Safari için Redirect, Diğerleri Popup)
    const loginWithGoogle = async () => {
        try {
            // Oturumu kalıcı yap (Mobil tarayıcılar için kritik)
            await setPersistence(auth, browserLocalPersistence)

            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

            if (isSafari) {
                console.log("Safari tespit edildi, Google girişi Redirect ile yapılıyor.")
                await signInWithRedirect(auth, googleProvider)
                return
            }

            // Mobilde popup bazen engellenebilir ama redirect'ten daha güvenilirdir bu durumda.
            const result = await signInWithPopup(auth, googleProvider)

            const existingData = await fetchUserData(result.user.uid)
            if (!existingData) {
                await createUserProfile(result.user.uid, {
                    email: result.user.email,
                    username: result.user.displayName?.replace(/\s/g, '').toLowerCase() || '',
                    displayName: result.user.displayName || '',
                    photoURL: result.user.photoURL || '',
                    provider: 'google'
                })
            }
            return result
        } catch (error) {
            console.error("Google login hatası:", error)
            throw error
        }
    }

    // Apple ile giriş yap (Safari için Redirect, Diğerleri Popup)
    const loginWithApple = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence)
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

            if (isSafari) {
                console.log("Safari tespit edildi, Apple girişi Redirect ile yapılıyor.")
                await signInWithRedirect(auth, appleProvider)
                return
            }

            const result = await signInWithPopup(auth, appleProvider)

            const existingData = await fetchUserData(result.user.uid)
            if (!existingData) {
                await createUserProfile(result.user.uid, {
                    email: result.user.email,
                    username: result.user.email?.split('@')[0] || '',
                    displayName: result.user.displayName || '',
                    photoURL: result.user.photoURL || '',
                    provider: 'apple'
                })
            }
            return result
        } catch (error) {
            console.error("Apple login hatası:", error)
            throw error
        }
    }

    // Discord hesabı bağla (Custom Vercel API Flow)
    const linkDiscordAccount = () => {
        const user = auth.currentUser
        if (!user) {
            alert('Lütfen önce giriş yapın.')
            return
        }

        // API'ye yönlendir (Devamında Discord'a gidecek)
        // Production ve Local ortam farkını window.location.origin halleder
        window.location.href = `${window.location.origin}/api/discord/login?uid=${user.uid}`
    }

    // Çıkış yap
    const logout = async () => {
        try {
            await signOut(auth)
            setUser(null)
            setUserData(null)
        } catch (error) {
            throw error
        }
    }

    // Kullanıcı profilini güncelle
    const updateUserProfile = async (data) => {
        if (!user) return
        try {
            const updateData = { ...data, updatedAt: serverTimestamp() }
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Firestore update timeout')), 10000)
            )
            await Promise.race([
                setDoc(doc(db, 'users', user.uid), updateData, { merge: true }),
                timeoutPromise
            ])

            // Local state'i güncelle
            setUserData(prev => ({ ...prev, ...data }))

            // Eğer photoURL veya displayName değiştiyse, auth user objesini de güncelle (Navbar için kritik)
            if (data.photoURL || data.displayName) {
                await updateProfile(user, {
                    photoURL: data.photoURL || user.photoURL,
                    displayName: data.displayName || user.displayName
                })
                // User state'ini tazelemek için kopya oluştur
                setUser({ ...user })
            }

        } catch (error) {
            console.warn('Profil güncellenemedi:', error)
            // Yine de yerel güncelleme yap
            setUserData(prev => ({ ...prev, ...data }))
            throw error
        }
    }

    // Admin kontrolü
    const OWNER_EMAIL = 'yigitoz1452@gmail.com'
    const isAdmin = userData?.role === 'admin' || user?.email === OWNER_EMAIL
    const isManager = userData?.role === 'manager' || isAdmin

    return (
        <AuthContext.Provider value={{
            user,
            userData,
            loading,
            isAdmin,
            isManager,
            register,
            login,
            loginWithGoogle,
            loginWithApple,
            logout,
            updateUserProfile,
            fetchUserData,
            linkDiscordAccount
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
