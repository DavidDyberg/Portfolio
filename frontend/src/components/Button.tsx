import type React from 'react'
import { cn } from '../../utils/classnames.ts'

type ButtonProps = {
  label: React.ReactNode
  variant: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export const CustomButton: React.FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-3 rounded-full cursor-pointer',
        variant === 'primary'
          ? 'bg-indigo-500 text-white hover:bg-indigo-600'
          : 'border-2 border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 ',
        className,
      )}
    >
      {label}
    </button>
  )
}
