import { fetchProject } from '@/api-routes/projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { CustomButton } from '@/components/Button'
import { useState } from 'react'

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

  const { data } = useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    image: data.image,
    techStack: data.techStack || [],
    liveDemo: data.liveDemo,
    githubLink: data.githubLink,
  })

  const handelResetFormData = () => {
    setFormData({
      title: data.title,
      description: data.description,
      image: data.image,
      techStack: data.techStack || [],
      liveDemo: data.liveDemo,
      githubLink: data.githubLink,
    })
  }

  return (
    <section className="mt-20">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            className="text-5xl text-white font-medium border border-gray-600 rounded-lg pl-2"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
            size={formData.title.length || 4}
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
                  setIsEditing(false)
                  handelResetFormData()
                }}
              />
            ) : (
              <CustomButton label="Delete project" variant="secondary" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative w-full h-80 mt-10 rounded-lg overflow-hidden group">
          <img
            className={`w-full h-80 object-cover rounded-lg mt-10 ${isEditing ? 'cursor-pointer hover:blur-xs' : ''}`}
            src={data.image}
            alt={`Image of ${data.title}`}
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-white text-lg font-semibold">Change Image</p>
            </div>
          )}
        </div>
        {isEditing ? (
          <div>
            <p className="text-white text-end pb-1">
              {formData.description.length} / 360
            </p>

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Add a description"
              className="text-white bg-transparent border border-gray-600 p-4 rounded-lg w-full"
              rows={4}
              maxLength={360}
            />
          </div>
        ) : (
          <p className="text-white">{data.description}</p>
        )}

        <div>
          <h2 className="text-white text-xl">Technologies used:</h2>
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
                className="text-white bg-transparent border border-gray-600 p-2 rounded-lg"
                type="text"
                value={formData.liveDemo}
                onChange={(e) =>
                  setFormData({ ...formData, liveDemo: e.target.value })
                }
                placeholder="Live demo link"
                id="liveDemoLink"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sourceCodeLink" className="text-white font-bold">
                Link to source code:
              </label>
              <input
                className="text-white bg-transparent border border-gray-600 p-2 rounded-lg"
                type="text"
                value={formData.githubLink}
                onChange={(e) =>
                  setFormData({ ...formData, githubLink: e.target.value })
                }
                placeholder="GitHub source code link"
                id="sourceCodeLink"
              />
            </div>
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
      </div>
    </section>
  )
}
