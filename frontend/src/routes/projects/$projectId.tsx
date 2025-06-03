import { fetchProject } from '@/api-routes/projects'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

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
  const { projectId } = Route.useParams()

  const { data } = useSuspenseQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProject(projectId),
  })

  return <div className="text-white">{data.title}</div>
}
