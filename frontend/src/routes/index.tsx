import { createFileRoute } from '@tanstack/react-router'
import { fetchAbout } from '@/api-routes/about'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchPinnedProjects } from '@/api-routes/projects'
import { ProjectCard } from '@/components/ProjectCard'
import { DotGrid } from '@/components/DotGrid'

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
      <section className="relative min-h-[300px] flex items-center justify-center top-25">
        {/* DotGrid as background, right side */}
        <div className="absolute inset-0 flex justify-end items-center z-0 pointer-events-auto">
          <div className="w-1/2 h-full sm:w-full flex items-center justify-end">
            <DotGrid />
          </div>
        </div>
        <div className="relative z-10 w-full  flex flex-col gap-4 items-start p-8 pointer-events-none">
          <h1 className="sm:text-7xl text-5xl text-white font-bold">
            Hi, i'm {aboutQuery.data.firstName}
            <span className="text-indigo-500">.</span>
          </h1>
          <p className="text-white text-3xl">
            I'm a{' '}
            <span className="text-indigo-500 font-bold">
              FullStack Developer
            </span>
          </p>
          <p className="text-white sm:w-3/4">{aboutQuery.data.bio}</p>
        </div>
      </section>

      <section className="pt-80">
        <h2 className="text-white text-4xl">Pinned projects</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {pinnedProjectsQuery.data.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              image={project.image}
              link={{
                to: '/projects/$projectId',
                params: { projectId: project._id },
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
