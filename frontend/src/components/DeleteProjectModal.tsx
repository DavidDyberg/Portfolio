import { deleteProject } from '@/api-routes/projects'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { CustomButton } from './Button'
import { useNavigate } from '@tanstack/react-router'
import { X } from 'lucide-react'

type Props = {
  onClose: () => void
  projectId: string
}

export function DeleteProjectModal({ onClose, projectId }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate({ to: '/projects' })
    },
  })

  const handleDelete = () => {
    mutation.mutate(projectId)
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Delete Project</h2>
          <X size={24} onClick={onClose} className="cursor-pointer" />
        </div>
        <p className="mb-4">Are you sure you want to delete this project?</p>
        <div className="flex justify-end space-x-2">
          <CustomButton label="Cancel" variant="primary" onClick={onClose} />
          <CustomButton
            label="Delete"
            variant="secondary"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
