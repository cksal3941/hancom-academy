import { Storage } from '@google-cloud/storage'

const storage = new Storage({ projectId: 'hancom-academy-ccfef' })
const bucket = storage.bucket('hancom-academy-ccfef.firebasestorage.app')

await bucket.setCorsConfiguration([
  {
    origin: ['http://localhost:5173', 'https://hancom-academy.vercel.app'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
    maxAgeSeconds: 3600,
    responseHeader: [
      'Content-Type',
      'Authorization',
      'Content-Length',
      'User-Agent',
      'x-goog-resumable',
    ],
  },
])

console.log('CORS 설정 완료')
