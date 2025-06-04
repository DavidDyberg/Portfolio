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
            className="text-5xl text-white font-medium border-1 border-indigo-400"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Project Title"
            size={formData.title.length - 0.1}
          />
        ) : (
          <h1 className="text-5xl text-white font-medium">{data.title}</h1>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <CustomButton
              onClick={() => setIsEditing(true)}
              label="Edit"
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
              <CustomButton label="Delete" variant="secondary" />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <img
          className="w-full h-80 object-cover rounded-lg mt-10"
          src={data.image}
          alt={`Image of ${data.title}`}
        />
        <p className="text-white">{data.description}</p>

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
        <div className="text-white font-bold flex gap-6">
          <div className="flex items-center gap-1 hover:underline">
            <ArrowUpRight className="cursor-pointer" size={24} color="white" />
            <a href={data.liveDemo} target="_blank">
              Link to live project
            </a>
          </div>
          <div className="flex items-center gap-1 hover:underline">
            <ArrowUpRight className="cursor-pointer" size={24} color="white" />
            <a href={data.githubLink} target="_blank">
              Link to source code
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
