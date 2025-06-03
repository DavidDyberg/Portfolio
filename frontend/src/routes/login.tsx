import { createFileRoute } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, login, logout } = useAuth()
  return (
    <div className="text-white">
      {!user ? (
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) login(response.credential)
          }}
          onError={() => console.log('Login Failed')}
        />
      ) : (
        <div className="flex items-center gap-4">
          <img src={user.picture} className="w-10 h-10 rounded-full" />
          <span>{user.name}</span>
          <button onClick={logout} className="border px-2 py-1">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
