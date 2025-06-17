import { useState } from 'react'
import { CustomButton } from './Button'
import FileUpload from './FileUpload'
import LoadingSpinner from './LoadingSpinner'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProject } from '@/api-routes/projects'
import type { Project } from '@/types/types'

type Props = {
  projectId: string
  data: Project
  onCancel: () => void
  onSuccess?: () => void
}

export function EditProjectMode({
  projectId,
  data,
  onCancel,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [githubLink, setGithubLink] = useState(data.githubLink)
  const [liveDemo, setLiveDemo] = useState(data.liveDemo)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [techStack, setTechStack] = useState<string[]>(data.techStack || [])
  const [techInput, setTechInput] = useState('')

  const queryClient = useQueryClient()
  const successToaster = () =>
    toast('Project updated successfully', {
      icon: <Check color="lightGreen" />,
    })

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateProject(projectId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      successToaster()
      onSuccess?.()
    },
  })

  const handleEditSubmit = () => {
    if (!title || !description) {
      alert('Title and description are required.')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('githubLink', githubLink || '')
    formData.append('liveDemo', liveDemo || '')
    techStack.forEach((tech) => formData.append('techStack', tech))

    if (selectedFile) {
      formData.append('image', selectedFile)
    } else if (data.image) {
      formData.append('existingImage', data.image)
    }
    mutation.mutate(formData)
  }

  const handleResetForm = () => {
    setTitle(data.title)
    setDescription(data.description)
    setGithubLink(data.githubLink)
    setLiveDemo(data.liveDemo)
    setSelectedFile(null)
    setTechStack(data.techStack || [])
    setTechInput('')
    onCancel()
  }

  const handleAddTech = () => {
    const trimmed = techInput.trim()
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed])
      setTechInput('')
    }
  }

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech))
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between w-full">
        <input
          className="text-5xl text-white font-medium border border-gray-600 rounded-lg pl-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomButton
          label="Leave edit mode"
          variant="secondary"
          onClick={handleResetForm}
        />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%]">
        <div className="relative flex-shrink-0 w-full max-w-lg aspect-w-16 aspect-h-9 mt-10 rounded-lg overflow-hidden group flex items-center justify-center">
          <label
            htmlFor="imageUpload"
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            Change image
          </label>
          {selectedFile && (
            <div className="absolute top-2 left-2 z-20 bg-black/70 p-2 rounded text-sm text-white">
              <p>File name: {selectedFile.name}</p>
              <p>File type: {selectedFile.type}</p>
              <p>File size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
          <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : data.image}
            className="w-full h-full object-contain object-top rounded-lg filter group-hover:blur-xs transition"
            alt="Project image"
          />
          <FileUpload onFileSelect={(file) => setSelectedFile(file)} />
        </div>
        <div className="flex flex-col gap-4 w-full pl-8">
          <p className="text-white text-end">{description.length} / 500</p>
          <textarea
            placeholder="Add a description"
            className="text-white bg-transparent border border-gray-600 p-4 rounded-lg w-full"
            rows={10}
            maxLength={500}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white">
          Tech Stack
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Add tech"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            className="text-white bg-transparent border border-gray-600 p-2 rounded-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddTech()
              }
            }}
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
              className="bg-indigo-500 text-white pt-3 pb-3 pl-3 pr-2 rounded text-sm flex items-center gap-1"
            >
              {tech}
              <X
                className="text-red-500 cursor-pointer hover:text-red-400"
                size={20}
                onClick={() => handleRemoveTech(tech)}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="liveDemoLink" className="text-white font-bold">
            Link to live project:
          </label>
          <input
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            className="text-white bg-transparent border border-gray-600 p-2 rounded-lg"
            type="text"
            placeholder="Live demo link"
            id="liveDemoLink"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sourceCodeLink" className="text-white font-bold">
            Link to source code:
          </label>
          <input
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="text-white bg-transparent border border-gray-600 p-2 rounded-lg"
            type="text"
            placeholder="GitHub source code link"
            id="sourceCodeLink"
          />
        </div>
        <div className="flex gap-2">
          <CustomButton
            label={
              mutation.isPending ? (
                <div className="flex justify-center gap-2 items-center">
                  <p className="">Save changes</p>
                  <LoadingSpinner color="white" size="sm" />
                </div>
              ) : (
                'Save changes'
              )
            }
            disabled={mutation.isPending}
            variant="primary"
            className="mb-4"
            onClick={handleEditSubmit}
          />
        </div>
      </div>
    </div>
  )
}
