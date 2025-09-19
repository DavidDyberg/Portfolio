import { Link } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="p-2 flex gap-2 text-white justify-end">
      <nav className="flex flex-row font-bold">
        <div className="px-2">
          <Link
            to="/"
            activeProps={{
              className: 'underline underline-offset-4',
            }}
          >
            About
          </Link>
        </div>

        <div className="px-2">
          <Link
            to="/projects"
            activeProps={{
              className: 'underline underline-offset-4',
            }}
          >
            Projects
          </Link>
        </div>
        {user && (
          <div className="px-2">
            <button className="cursor-pointer" onClick={logout}>
              LogOut
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
