import { Navigate, Outlet } from 'react-router'

import { useAuth } from '@/contexts/auth'
import { ROUTES_KEYS } from '@/routes/routes.keys'

const PublicLayout = () => {
  const { user, isInitializing } = useAuth()

  if (isInitializing) return null

  return user ? <Navigate to={ROUTES_KEYS.PRIVATE.HOME} /> : <Outlet />
}

export default PublicLayout
