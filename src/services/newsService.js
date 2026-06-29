import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, isFirebaseConfigured, storage } from '../firebase/firebase'
import newsData from '../data/newsData'

const COL = 'news'

async function uploadImages(files) {
  if (!storage) throw new Error('Firebase Storage가 설정되지 않았습니다.')
  return Promise.all(
    files.map(async (file) => {
      const path = `news/${Date.now()}_${file.name}`
      const snapshot = await uploadBytes(ref(storage, path), file)
      return getDownloadURL(snapshot.ref)
    }),
  )
}

export async function fetchNews() {
  if (!isFirebaseConfigured || !db) return newsData

  try {
    const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const firestoreItems = snap.docs.map((d) => ({
      ...d.data(),
      id: d.id,
      path: `/notice/news/${d.id}`,
    }))
    return [...firestoreItems, ...newsData]
  } catch {
    return newsData
  }
}

export async function fetchNewsById(id) {
  const staticItem = newsData.find((n) => String(n.id) === String(id))
  if (staticItem) return staticItem

  if (!isFirebaseConfigured || !db) return null

  try {
    const snap = await getDoc(doc(db, COL, id))
    if (!snap.exists()) return null
    return { ...snap.data(), id: snap.id, path: `/notice/news/${snap.id}` }
  } catch {
    return null
  }
}

export async function incrementNewsViews(id) {
  if (!isFirebaseConfigured || !db) return
  if (newsData.find((n) => String(n.id) === String(id))) return
  try { await updateDoc(doc(db, COL, id), { views: increment(1) }) } catch {}
}

export async function deleteNews(id) {
  if (!isFirebaseConfigured || !db) throw new Error('Firebase가 설정되지 않았습니다.')
  await deleteDoc(doc(db, COL, id))
}

export async function addNews({ category, title, content, imageFiles = [] }) {
  if (!isFirebaseConfigured || !db) throw new Error('Firebase가 설정되지 않았습니다.')

  const paragraphs = content.split('\n').map((p) => p.trim()).filter(Boolean)
  let images = []
  if (imageFiles.length > 0) {
    try { images = await uploadImages(imageFiles) } catch (e) { console.warn('[Storage] 이미지 업로드 실패 (이미지 없이 저장):', e) }
  }

  const ref = await addDoc(collection(db, COL), {
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
  return ref.id
}

export async function updateNews(id, { category, title, content, imageFiles = [], existingImages = [] }) {
  if (!isFirebaseConfigured || !db) throw new Error('Firebase가 설정되지 않았습니다.')

  const paragraphs = content.split('\n').map((p) => p.trim()).filter(Boolean)
  let newImages = []
  if (imageFiles.length > 0) {
    try { newImages = await uploadImages(imageFiles) } catch (e) { console.warn('[Storage] 이미지 업로드 실패:', e) }
  }

  await updateDoc(doc(db, COL, id), {
    category,
    title,
    content: paragraphs,
    images: [...existingImages, ...newImages],
    summary: paragraphs[0]?.slice(0, 80) ?? '',
    updatedAt: serverTimestamp(),
  })
}
