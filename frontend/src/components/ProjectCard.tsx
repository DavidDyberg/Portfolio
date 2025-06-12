import { Link, type LinkProps } from '@tanstack/react-router'
import type React from 'react'
import { cn } from '../../utils/classnames.ts'

type ProjectCardProps = {
  title: string
  image?: string
  link: LinkProps
  className?: string
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  link,
  className,
}) => {
  return (
    <Link {...link}>
      <div className="flex flex-col gap-2">
        <h2 className={cn('text-white text-4xl font-semibold', className)}>
          {title}
        </h2>
        <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden">
          <img
            className={cn(
              'rounded-2xl object-contain hover:scale-102 transition-transform duration-300 w-full h-full',
              className,
            )}
            src={image}
            alt={`Image of the project ${title}`}
          />
        </div>
      </div>
    </Link>
  )
}
