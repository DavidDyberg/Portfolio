import { createFileRoute } from '@tanstack/react-router'
import { fetchAbout } from '@/api-routes/about'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/')({
  component: App,
  pendingComponent: () => <div className="text-white">Loading...</div>,
  errorComponent: () => <div>Error loading data</div>,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery({
      queryKey: ['about'],
      queryFn: fetchAbout,
    })
  },
})

function App() {
  const aboutQuery = useSuspenseQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
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
    </div>
  )
}
