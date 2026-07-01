const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export async function uploadImages(files) {
  return Promise.all(
    files.map(async (file) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData },
      )
      const data = await res.json()
      if (!res.ok) {
        console.error('[Cloudinary] 업로드 실패:', data)
        throw new Error(data?.error?.message ?? '이미지 업로드에 실패했습니다.')
      }
      return data.secure_url
    }),
  )
}
