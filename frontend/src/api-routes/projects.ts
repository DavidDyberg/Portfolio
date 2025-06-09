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

export const fetchProject = async (projectId: string) => {
  const { data } = await axios.get(
    `https://portfolio-backend-mu-seven.vercel.app/api/projects/${projectId}`,
  )
  return data as Project
}

export const createProject = async (projectData: FormData) => {
  const { data } = await axios.post(
    'https://portfolio-backend-mu-seven.vercel.app/api/projects',
    projectData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return data as Project
}
