import React, { useEffect, useState } from 'react'
import { CustomButton } from './Button'
import { X } from 'lucide-react'

type Props = {
  onClose: () => void
}

export function AddProjectModal({ onClose }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [liveLink, setLiveLink] = useState('')
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
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            placeholder="Description"
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
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="url"
            placeholder="Live Link"
            onChange={(e) => setLiveLink(e.target.value)}
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
              label="Submit"
              variant="primary"
              className="rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
