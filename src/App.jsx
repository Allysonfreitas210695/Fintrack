import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/auth'
import Routes from './routes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
