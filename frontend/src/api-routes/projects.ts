import type { Project } from '@/types/types'
import axios from 'axios'

export const fetchPinnedProjects = async () => {
  const { data } = await axios.get(
    'https://portfolio-backend-mu-seven.vercel.app/api/projects?limit=2',
  )
  return data as Project[]
}

export const fetchAllProjects = async () => {
  const { data } = await axios.get(
    'https://portfolio-backend-mu-seven.vercel.app/api/projects',
  )
  return data as Project[]
}
