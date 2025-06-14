import { fetchProject, updateProject } from '@/api-routes/projects'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { CustomButton } from '@/components/Button'
import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import { DeleteProjectModal } from '@/components/DeleteProjectModal'
import { useRouter } from '@tanstack/react-router'
import { GoBackButton } from '@/components/GoBackButton'
import LoadingSpinner from '@/components/LoadingSpinner'

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
  pendingComponent: () => <div className="text-white">Loading...</div>,
  errorComponent: () => <div>Error loading data</div>,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.prefetchQuery({
      queryKey: ['project', params.projectId],
      queryFn: () => fetchProject(params.projectId),
    })
  },
})

function RouteComponent() {
  const { user } = useAuth()
  const { projectId } = Route.useParams()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const router = useRouter()
  const goBack = router.history.back

  const { data } = useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  })

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [githubLink, setGithubLink] = useState(data.githubLink)
  const [liveDemo, setLiveDemo] = useState(data.liveDemo)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateProject(projectId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] })
      setIsEditing(false)
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
    setIsEditing(false)
  }

  return (
    <section className="mt-20">
      <GoBackButton onClick={goBack} />
      <div className="sm:flex sm:flex-row sm:items-center sm:justify-between flex flex-col-reverse gap-4">
        {isEditing ? (
          <input
            className="text-5xl text-white font-medium border border-gray-600 rounded-lg pl-2"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-5xl text-white font-medium">{data.title}</h1>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <CustomButton
              onClick={() => setIsEditing(true)}
              label="Enter edit mode"
              variant="primary"
            />
            {isEditing ? (
              <CustomButton
                label="Exit edit mode"
                variant="secondary"
                onClick={() => {
                  handleResetForm()
                }}
              />
            ) : (
              <CustomButton
                label="Delete project"
                variant="secondary"
                onClick={() => setDeleteModalOpen(true)}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6 sm:pt-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-8">
          {isEditing ? (
            <div className="relative flex-shrink-0 w-full max-w-lg aspect-w-16 aspect-h-9 mt-10 rounded-lg overflow-hidden group bg-gray-900 flex items-center justify-center">
              <label
                htmlFor="imageUpload"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                Change image
              </label>
              {selectedFile && (
                <>
                  <div className="absolute top-2 left-2 z-20 bg-black/70 p-2 rounded text-sm text-white">
                    <p>File name: {selectedFile.name}</p>
                    <p>File type: {selectedFile.type}</p>
                    <p>File size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                </>
              )}

              <img
                src={
                  selectedFile ? URL.createObjectURL(selectedFile) : data.image
                }
                className="w-full h-full object-contain rounded-lg filter group-hover:blur-xs transition"
                alt="Project image"
              />
              <FileUpload
                onFileSelect={(file) => {
                  setSelectedFile(file)
                }}
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-full sm:max-w-lg aspect-w-16 aspect-h-9 mt-10 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                src={data.image}
                alt={`Image of ${data.title}`}
              />
            </div>
          )}
          {isEditing ? (
            <div className="w-full lg:pt-4">
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
          ) : (
            <p className="text-white lg:pt-10">{data.description}</p>
          )}
        </div>
        <div>
          <h2 className="text-white text-base pb-4">
            <span className="font-bold">{data.title}</span> was created using:
          </h2>
          {data.techStack && (
            <ul className="ml-4">
              {data.techStack.map((tech, index) => (
                <li key={index} className="text-white list-disc">
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>

        {isEditing ? (
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
            <CustomButton
              label={
                mutation.isPending ? (
                  <div className="flex justify-center">
                    <LoadingSpinner color="white" size="sm" />
                  </div>
                ) : (
                  'Save changes'
                )
              }
              disabled={mutation.isPending}
              variant="primary"
              className=" mb-4"
              onClick={handleEditSubmit}
            />
          </div>
        ) : (
          <div className="text-white font-bold flex gap-6">
            <div className="flex items-center gap-1 hover:underline">
              <ArrowUpRight
                className="cursor-pointer"
                size={24}
                color="white"
              />
              <a href={data.liveDemo} target="_blank">
                Link to live project
              </a>
            </div>
            <div className="flex items-center gap-1 hover:underline">
              <ArrowUpRight
                className="cursor-pointer"
                size={24}
                color="white"
              />
              <a href={data.githubLink} target="_blank">
                Link to source code
              </a>
            </div>
          </div>
        )}

        {deleteModalOpen && (
          <DeleteProjectModal
            onClose={() => setDeleteModalOpen(false)}
            projectId={data._id}
          />
        )}
      </div>
    </section>
  )
}
