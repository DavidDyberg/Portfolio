import { Link, type LinkProps } from '@tanstack/react-router'
import type React from 'react'
import { cn } from '../../utils/classnames.ts'

type ProjectCardProps = {
  title: string
  image?: string
  link: LinkProps['to']
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  link,
  className,
}) => {
  return (
    <Link to={link}>
      <div className="flex flex-col gap-4">
        <h2 className={cn('text-white text-2xl font-semibold', className)}>
          {title}
        </h2>
        <img
          className={cn(
            'w-xs h-64 rounded-2xl object-cover hover:scale-102 transition-transform duration-300',
            className,
          )}
          src={image}
          alt="Project image"
        />
      </div>
    </Link>
  )
}
