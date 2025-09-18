import { createBrowserRouter, RouterProvider } from 'react-router'

import PrivateLayout from '@/layouts/privateLayout'
import PublicLayout from '@/layouts/publicLayout'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import NotFoundPage from '@/pages/not-found'
import SignupPage from '@/pages/signup'

import { ROUTES_KEYS } from './routes.keys'

const router = createBrowserRouter([
  // Rotas públicas
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
      { index: true, Component: HomePage },
      { path: ROUTES_KEYS.PRIVATE.HOME, Component: HomePage },
    ],
  },
  // 📄 Rota para página não encontrada (404)
  {
    path: ROUTES_KEYS.NOT_FOUND,
    Component: NotFoundPage,
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
