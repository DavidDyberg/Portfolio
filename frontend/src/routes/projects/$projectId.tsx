import { fetchProject } from '@/api-routes/projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { CustomButton } from '@/components/Button'
import { useState } from 'react'
import { DeleteProjectModal } from '@/components/DeleteProjectModal'
import { useRouter } from '@tanstack/react-router'
import { GoBackButton } from '@/components/GoBackButton'
import { EditProjectMode } from '@/components/EditProjectMode'

export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
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
  const [isEditing, setIsEditing] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const router = useRouter()
  const goBack = router.history.back

  const { data } = useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  })

  return (
    <section className="mt-20">
      <GoBackButton onClick={goBack} />
      <div className="md:flex md:flex-row md:items-center md:justify-between flex flex-col-reverse gap-4">
        {isEditing ? (
          <EditProjectMode
            projectId={projectId}
            data={data}
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h1 className="text-5xl text-white font-medium">{data.title}</h1>
            {user && (
              <div className="flex items-center gap-4">
                <CustomButton
                  onClick={() => setIsEditing(true)}
                  label="Enter edit mode"
                  variant="primary"
                />
                <CustomButton
                  label="Delete project"
                  variant="secondary"
                  onClick={() => setDeleteModalOpen(true)}
                />
              </div>
            )}
          </>
        )}
      </div>
      {!isEditing && (
        <div className="flex flex-col gap-6 md:pt-8 mb-20">
          <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-8">
            <div className="flex-shrink-0 w-full md:max-w-lg aspect-w-16 aspect-h-9 mt-10 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                src={data.image}
                alt={`Image of ${data.title}`}
              />
            </div>
            <p className="text-white lg:pt-10 whitespace-pre-line">
              {data.description}
            </p>
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
          <div className="text-white font-bold flex gap-6">
            {data.liveDemo && (
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
            )}
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
          {deleteModalOpen && (
            <DeleteProjectModal
              onClose={() => setDeleteModalOpen(false)}
              projectId={data._id}
            />
          )}
        </div>
      )}
    </section>
  )
}
