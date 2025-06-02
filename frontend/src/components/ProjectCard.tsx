import { Link, type LinkProps } from '@tanstack/react-router'
import type React from 'react'

type ProjectCardProps = {
  title: string
  image: string
  link: LinkProps['to']
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  link,
}) => {
  return (
    <Link to={link}>
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
        <img
          className="w-xs h-64 rounded-2xl hover:scale-102 transition-transform duration-300"
          src={image}
          alt="Project image"
        />
      </div>
    </Link>
  )
}
