import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <p className="text-white text-2xl">Home</p>
    </div>
  )
}
