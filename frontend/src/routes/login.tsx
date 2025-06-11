import { createFileRoute } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '@/context/AuthContext'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, login, logout } = useAuth()
  return (
    <div className="text-white flex justify-center h-screen">
      {!user ? (
        <GoogleLogin
          onSuccess={(response) => {
            if (response.credential) login(response.credential)
          }}
          onError={() => console.log('Login Failed')}
        />
      ) : (
        <div className="flex items-center gap-4 flex-col justify-center">
          <h1 className="text-5xl">Welcome</h1>
          <span className="text-4xl">{user.name}</span>
          <img src={user.picture} className="w-20 h-20 rounded-full" />
          <button
            onClick={logout}
            className="border px-4 py-2 cursor-pointer hover:border-amber-50 hover:text-amber-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
