import { cn } from '../../utils/classnames.ts'

type ButtonProps = {
  label: string
  variant: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

export const CustomButton: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-3 rounded-full cursor-pointer',
        variant === 'primary'
          ? 'bg-indigo-600 text-white hover:bg-indigo-500'
          : 'border-2 border-red-600 text-red-600 hover:border-red-500 hover:text-red-500 ',
        className,
      )}
    >
      {label}
    </button>
  )
}
