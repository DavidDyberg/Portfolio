import { createFileRoute } from '@tanstack/react-router'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="login">
      <h1>Login</h1>
      <div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('Login successful:', credentialResponse)
            console.log('Crededntial string:', credentialResponse.credential)
            if (credentialResponse.credential) {
              console.log('User: ', jwtDecode(credentialResponse.credential))
            } else {
              console.error('No credential found in response')
            }
          }}
          onError={() => {
            console.log('Login failed')
          }}
        />
      </div>
    </div>
  )
}
