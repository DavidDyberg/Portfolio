import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-[#282c34] h-screen">
      <h1 className="text-white">Projects</h1>
    </div>
  )
}
