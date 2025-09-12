import { Navigate, Outlet } from 'react-router'

const RoutesPrivate = () => {
  const user = false

  return user ? <Outlet /> : <Navigate to="/auth/login" replace />
}

export default RoutesPrivate
