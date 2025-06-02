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
