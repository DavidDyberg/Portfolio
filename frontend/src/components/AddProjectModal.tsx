import React, { useEffect, useState } from 'react'
import { CustomButton } from './Button'
import { X } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProject } from '@/api-routes/projects'
import LoadingSpinner from './LoadingSpinner'

type Props = {
  onClose: () => void
}

export function AddProjectModal({ onClose }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [liveDemo, setLiveDemo] = useState('')
  const [techInput, setTechInput] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleAddTech = () => {
    if (techInput.trim()) {
      setTechStack([...techStack, techInput.trim()])
      setTechInput('')
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const handleSubmit = () => {
    if (!title || !description || !imageFile) {
      alert('Please fill in title, description and image')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('githubLink', githubLink)
    formData.append('liveDemo', liveDemo)
    techStack.forEach((tech) => formData.append('techStack', tech))

    if (imageFile) {
      formData.append('image', imageFile)
    }

    mutation.mutate(formData)
  }

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg shadow-lg overflow-y-auto max-h-screen">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Project</h2>
          <X className="cursor-pointer" onClick={() => onClose()} size={24} />
        </div>

        <div className="space-y-3">
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            required
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium mb-2"
            >
              Choose an image:
            </label>
            <div className="relative">
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer inline-block bg-indigo-500 text-white px-4 py-2 rounded-lg text-center hover:bg-indigo-600 transition"
              >
                Select Image
              </label>
              {imageFile && (
                <div>
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {imageFile.name}
                  </p>
                  <img
                    className="w-40 h-40 object-contain"
                    src={URL.createObjectURL(imageFile)}
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Tech Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add your tech stack"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              <CustomButton
                label="Add"
                variant="primary"
                onClick={handleAddTech}
                className="rounded-2xl"
              />
            </div>
            <div className="flex gap-2 flex-wrap mt-2">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-2 py-1 rounded text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <input
            type="url"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="url"
            placeholder="Live Link"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2 mt-4">
            <CustomButton
              label="Close"
              variant="secondary"
              onClick={onClose}
              className="rounded-3xl"
            />
            <CustomButton
              label={
                mutation.isPending ? (
                  <div className="flex justify-center gap-2 items-center">
                    <p className="">Submitting</p>
                    <LoadingSpinner color="white" size="sm" />
                  </div>
                ) : (
                  'Submit'
                )
              }
              disabled={mutation.isPending}
              variant="primary"
              onClick={handleSubmit}
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
