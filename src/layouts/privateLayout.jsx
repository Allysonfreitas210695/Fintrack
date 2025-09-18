import { Navigate, Outlet } from 'react-router'

import { useAuth } from '@/contexts/auth'
import { ROUTES_KEYS } from '@/routes/routes.keys'

const PrivateLayout = () => {
  const { user, isInitializing } = useAuth()

  if (isInitializing) return null

  return user ? <Outlet /> : <Navigate to={ROUTES_KEYS.AUTH.LOGIN} />
}

export default PrivateLayout
