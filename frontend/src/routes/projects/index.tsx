import { fetchAllProjects } from '@/api-routes/projects'
import { AddProjectModal } from '@/components/AddProjectModal'
import { CustomButton } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/projects/')({
  component: RouteComponent,
  pendingComponent: () => <div className="text-white">Loading...</div>,
  errorComponent: () => <div>Error loading data</div>,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery({
      queryKey: ['projects'],
      queryFn: fetchAllProjects,
    })
  },
})

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuth()

  const projectsQuery = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: fetchAllProjects,
  })

  return (
    <div className="mt-20 mb-20">
      <div className="sm:flex sm:flex-row sm:justify-between flex flex-col gap-4">
        <h1 className="text-5xl text-white font-medium">My work</h1>
        {user && (
          <CustomButton
            label="Add new project"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          />
        )}
      </div>
      <div className="mt-10 grid grid-cols-1  sm:grid-cols-2 gap-8">
        {projectsQuery.data.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            image={
              project.image ||
              'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
            }
            link={{
              to: '/projects/$projectId',
              params: { projectId: project._id },
            }}
          />
        ))}
      </div>
      {isModalOpen && <AddProjectModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
