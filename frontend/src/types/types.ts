export type User = {
  _id: string
  firstName: string
  lastName: string
  bio: string
  profileImage: string
  email?: string
  age?: number
  skills?: string[]
  socials?: Record<string, any>
  phoneNumber?: string
  createdAt?: string
  updatedAt?: string
}

export type Project = {
  _id: string
  title: string
  description: string
  techStack?: string[]
  githubLink?: string
  liveDemo?: string
  image?: string
  createdAt?: string
  updatedAt?: string
}
