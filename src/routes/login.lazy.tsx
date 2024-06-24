import { createLazyFileRoute } from '@tanstack/react-router'
import Login from '../Auth/Login'

export const Route = createLazyFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <>
        <Login></Login>
    </>
  )
}
