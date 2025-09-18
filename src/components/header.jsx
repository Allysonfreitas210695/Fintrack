import { ChevronDownIcon, LogOutIcon } from 'lucide-react'

import logo from '@/assets/images/logo.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <Card
      className={
        'border-muted-foreground rounded-none border-0 border-b-1 bg-[#171717]'
      }
    >
      <CardContent className={'flex items-center justify-between px-8 py-4'}>
        <div>
          <img src={logo} alt="FinTrack" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="border-muted-foreground bg-[#171717] py-5"
            >
              <Button variant="outline" className="space-x-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-muted-foreground text-sm">
                  {user.firstName} {user.lastName}
                </p>
                <ChevronDownIcon className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                  onClick={signOut}
                >
                  <LogOutIcon />
                  Sair
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
