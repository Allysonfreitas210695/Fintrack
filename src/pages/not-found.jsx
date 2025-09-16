import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { ROUTES_KEYS } from '@/routes/routes.keys'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="p-2 text-center shadow-md">
        <h1 className="text-muted-foreground text-2xl">
          {' '}
          404 - Página não encontrada!
        </h1>
      </div>
      <Button asChild variant="link" className="mt-2">
        <Link to={ROUTES_KEYS.AUTH.LOGIN} className="text-muted-foreground">
          Tela inícial
        </Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
