import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center h-screen bg-[#282c34]">
      <p className="text-white text-2xl">Home</p>
    </div>
  )
}
