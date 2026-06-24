import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  setPersistence,
  updateProfile,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import {
  auth,
  db,
  isAppleAuthEnabled,
  isFirebaseConfigured,
} from '../firebase/firebase'

const googleProvider = new GoogleAuthProvider()
const appleProvider  = new OAuthProvider('apple.com')

googleProvider.setCustomParameters({ prompt: 'select_account' })

export async function loginWithGoogle() {
  ensureFirebaseConfigured()
  await setPersistence(auth, browserLocalPersistence)
  const result = await signInWithPopup(auth, googleProvider)
  await saveUser(result.user, false)
  return result.user
}

export async function loginWithApple() {
  ensureFirebaseConfigured()
  if (!isAppleAuthEnabled) {
    throw new Error('Apple 로그인이 아직 설정되지 않았습니다.')
  }
  await setPersistence(auth, browserLocalPersistence)
  const result = await signInWithPopup(auth, appleProvider)
  await saveUser(result.user, false)
  return result.user
}

export async function loginWithEmail(email, password, rememberMe = false) {
  ensureFirebaseConfigured()
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
  const result = await signInWithEmailAndPassword(auth, email.trim(), password)
  await saveUser(result.user, false)
  return result.user
}

export async function signUpWithEmail(name, email, password) {
  ensureFirebaseConfigured()
  await setPersistence(auth, browserLocalPersistence)
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password)
  await updateProfile(result.user, { displayName: name })
  await saveUser(result.user, true)
  return result.user
}

export async function sendPasswordReset(email) {
  ensureFirebaseConfigured()
  await sendPasswordResetEmail(auth, email.trim())
}

export async function logout() {
  if (!isFirebaseConfigured) return
  await signOut(auth)
}

function ensureFirebaseConfigured() {
  if (!isFirebaseConfigured || !auth) {
    throw new Error('Firebase가 설정되지 않았습니다.')
  }
}

async function saveUser(user, isNewUser) {
  if (!db) return
  try {
    const profile = {
      uid:         user.uid,
      displayName: user.displayName,
      email:       user.email,
      photoURL:    user.photoURL,
      lastLoginAt: serverTimestamp(),
    }

    if (isNewUser) profile.createdAt = serverTimestamp()
    await setDoc(doc(db, 'users', user.uid), profile, { merge: true })
  } catch { /* Firestore 미설정 시 무시 */ }
}
