import { useUnsplash } from '../utils/unsplash'

export default defineEventHandler(async () => {
  if (import.meta.dev) {
    // const data: any = (await import('~~/mock/unsplash.json')).default
    // return data.response
  }

  return []

  // const res = await useUnsplash().photos.getRandom({ count: 20 })
  // return res.response
})
