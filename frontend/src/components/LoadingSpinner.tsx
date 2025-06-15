type Props = {
  color?: string
  size: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-14 h-14',
}

export default function LoadingSpinner({
  color = 'border-indigo-400',
  size,
}: Props) {
  return (
    <div
      className={`${sizeMap[size]} border-2 border-solid ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  )
}
