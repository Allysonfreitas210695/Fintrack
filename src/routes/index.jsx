import { createBrowserRouter, RouterProvider } from 'react-router'

import PrivateLayout from '@/layouts/privateLayout'
import PublicLayout from '@/layouts/publicLayout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import SignupPage from '@/pages/signup'

import { ROUTES_KEYS } from './routes.keys'
import RoutesPrivate from './routes.private'

const router = createBrowserRouter([
  // 📌 Rotas públicas
  {
    path: '/auth',
    Component: PublicLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: ROUTES_KEYS.AUTH.LOGIN, Component: LoginPage },
      { path: ROUTES_KEYS.AUTH.SIGNUP, Component: SignupPage },
    ],
  },
  // 🔒 Rotas privadas
  {
    path: '/',
    Component: PrivateLayout,
    children: [
      {
        Component: RoutesPrivate,
        children: [
          { index: true, Component: HomePage },
          { path: ROUTES_KEYS.PRIVATE.HOME, Component: HomePage },
        ],
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
