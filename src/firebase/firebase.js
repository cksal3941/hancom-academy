import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)
export const isAppleAuthEnabled = import.meta.env.VITE_FIREBASE_ENABLE_APPLE === 'true'

let auth    = null
let db      = null
let storage = null

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  auth.languageCode = typeof navigator === 'undefined' ? 'ko' : navigator.language
  db      = getFirestore(app)
  storage = getStorage(app)
}

export { auth, db, storage }
