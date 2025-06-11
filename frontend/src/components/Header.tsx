import { Link } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="p-2 flex gap-2 text-white justify-end">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/projects">Projects</Link>
        </div>
        {user ? (
          <div className="px-2 font-bold">
            <button className="cursor-pointer" onClick={logout}>
              LogOut
            </button>
          </div>
        ) : (
          <div className="px-2 font-bold">
            <Link to="/login">Login</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
