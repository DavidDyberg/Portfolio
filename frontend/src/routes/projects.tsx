import { fetchAllProjects } from '@/api-routes/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
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
  const projectsQuery = useSuspenseQuery({
    queryKey: ['projects'],
    queryFn: fetchAllProjects,
  })

  return (
    <div className="mt-20">
      <h1 className="text-5xl text-white font-medium">All projects</h1>
      <div className="mt-10 grid grid-cols-1 place-items-center sm:grid-cols-2  gap-8">
        {projectsQuery.data.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            image={
              project.image ||
              'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
            }
            link="/"
          />
        ))}
      </div>
      )
    </div>
  )
}
