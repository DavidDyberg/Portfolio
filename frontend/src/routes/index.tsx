import { createFileRoute } from '@tanstack/react-router'
import { fetchAbout } from '@/api-routes/about'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchPinnedProjects } from '@/api-routes/projects'
import { ProjectCard } from '@/components/ProjectCard'

export const Route = createFileRoute('/')({
  component: App,
  pendingComponent: () => <div className="text-white">Loading...</div>,
  errorComponent: () => <div>Error loading data</div>,
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['about'],
        queryFn: fetchAbout,
      }),
      queryClient.prefetchQuery({
        queryKey: ['pinnedProjects'],
        queryFn: fetchPinnedProjects,
      }),
    ])
  },
})

function App() {
  const aboutQuery = useSuspenseQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
  })

  const pinnedProjectsQuery = useSuspenseQuery({
    queryKey: ['pinnedProjects'],
    queryFn: fetchPinnedProjects,
  })

  return (
    <div className="mt-20">
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl text-white font-medium">
            {aboutQuery.data.firstName} {aboutQuery.data.lastName}
          </h1>
          <p className="text-white text-3xl">
            I'm a <span className="text-cyan-300">FullStack Developer</span>
          </p>
          <p className="text-white">{aboutQuery.data.bio}</p>
        </div>
        <div>
          <img
            src={aboutQuery.data.profileImage}
            alt={`Image of ${aboutQuery.data.firstName} ${aboutQuery.data.lastName}`}
            className="w-xs h-xs rounded-full"
          />
        </div>
      </section>

      {pinnedProjectsQuery.data && (
        <section>
          <h2 className="text-white text-4xl">Pinned projects</h2>
          <div className="flex items-center justify-between">
            {pinnedProjectsQuery.data.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                image={aboutQuery.data.profileImage}
                link={'/projects'}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
