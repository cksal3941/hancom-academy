import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, isFirebaseConfigured, storage } from '../firebase/firebase'
import noticeData from '../data/noticeData'
import openingNewsData from '../data/openingNewsData'

const COL = 'notices'
const OPENING_COL = 'opening-notices'

async function uploadImages(files) {
  if (!storage) throw new Error('Firebase Storage가 설정되지 않았습니다.')

  return Promise.all(
    files.map(async (file) => {
      const path = `notices/${Date.now()}_${file.name}`
      const snapshot = await uploadBytes(ref(storage, path), file)
      return getDownloadURL(snapshot.ref)
    }),
  )
}

export async function addNotice({ category, title, content, imageFiles = [] }) {
  if (!isFirebaseConfigured || !db) throw new Error('Firebase가 설정되지 않았습니다.')

  const paragraphs = content.split('\n').map((p) => p.trim()).filter(Boolean)
  const images = imageFiles.length > 0 ? await uploadImages(imageFiles) : []

  await addDoc(collection(db, COL), {
    category,
    title,
    content: paragraphs,
    images,
    summary: paragraphs[0]?.slice(0, 80) ?? '',
    author: '관리자',
    views: 0,
    date: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
  })
}

export async function fetchNotices() {
  if (!isFirebaseConfigured || !db) return noticeData

  try {
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)

    const firestoreNotices = snap.docs.map((d) => ({
      ...d.data(),
      id: d.id,
      path: `/notice/${d.id}`,
    }))

    return [...firestoreNotices, ...noticeData]
  } catch {
    return noticeData
  }
}

export async function addOpeningNotice({ title, content, imageFiles = [] }) {
  if (!isFirebaseConfigured || !db) throw new Error('Firebase가 설정되지 않았습니다.')

  const paragraphs = content.split('\n').map((p) => p.trim()).filter(Boolean)
  const images = imageFiles.length > 0 ? await uploadImages(imageFiles) : []

  await addDoc(collection(db, OPENING_COL), {
    category: '개강소식',
    title,
    content: paragraphs,
    images,
    summary: paragraphs[0]?.slice(0, 80) ?? '',
    author: '관리자',
    views: 0,
    date: new Date().toISOString().slice(0, 10),
    createdAt: serverTimestamp(),
  })
}

export async function fetchOpeningNotices() {
  if (!isFirebaseConfigured || !db) return openingNewsData

  try {
    const q = query(collection(db, OPENING_COL), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)

    const firestoreItems = snap.docs.map((d) => ({
      ...d.data(),
      id: d.id,
      path: `/notice/start/${d.id}`,
    }))

    return [...firestoreItems, ...openingNewsData]
  } catch {
    return openingNewsData
  }
}

export async function fetchOpeningNoticeById(id) {
  const staticItem = openingNewsData.find((n) => String(n.id) === String(id))
  if (staticItem) return staticItem

  if (!isFirebaseConfigured || !db) return null

  try {
    const snap = await getDoc(doc(db, OPENING_COL, id))
    if (!snap.exists()) return null
    return { ...snap.data(), id: snap.id, path: `/notice/start/${snap.id}` }
  } catch {
    return null
  }
}

export async function fetchNoticeById(id) {
  const staticNotice = noticeData.find((n) => String(n.id) === String(id))
  if (staticNotice) return staticNotice

  if (!isFirebaseConfigured || !db) return null

  try {
    const snap = await getDoc(doc(db, COL, id))
    if (!snap.exists()) return null
    return { ...snap.data(), id: snap.id, path: `/notice/${snap.id}` }
  } catch {
    return null
  }
}
