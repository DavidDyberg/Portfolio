import { Link } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="p-2 flex gap-2 text-white justify-end">
      <nav className="flex flex-row font-bold">
        <div className="px-2">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2">
          <Link to="/projects">Projects</Link>
        </div>
        {user ? (
          <div className="px-2">
            <button className="cursor-pointer" onClick={logout}>
              LogOut
            </button>
          </div>
        ) : (
          <div className="px-2">
            <Link to="/login">Login</Link>
          </div>
        )}
        <div className="px-2">
          <Link to="/pokemon">Pokemon game</Link>
        </div>
      </nav>
    </header>
  )
}
