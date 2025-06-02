import type { User } from '@/types/types'
import axios from 'axios'

export const fetchAbout = async () => {
  const { data } = await axios.get(
    'https://portfolio-backend-mu-seven.vercel.app/api/about/67d81701db328e5ebbc4d096',
  )
  return data as User
}
