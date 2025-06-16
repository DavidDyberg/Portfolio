import { ChevronLeft } from 'lucide-react'

type Props = {
  onClick: () => void
}

export function GoBackButton({ onClick }: Props) {
  return (
    <div onClick={onClick} className="inline-flex items-center cursor-pointer">
      <ChevronLeft size={24} color="white" />
      <button className="text-white font-bold cursor-pointer bg-transparent border-none p-0 ml-1">
        Go back
      </button>
    </div>
  )
}
