import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

import { useLogin } from '@/api/hooks/user'
import { InputPassword } from '@/components/input-password'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ROUTES_KEYS } from '@/routes/routes.keys'

const formSchema = z.object({
  email: z
    .email({ message: 'O e-mail é inválido.' })
    .trim()
    .min(1, { message: 'O e-mail é obrigatório.' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLogin()

  async function handleSubmit(data) {
    try {
      await loginMutation.mutateAsync(data)
      toast.success('Login realizado com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px] border-0 bg-transparent">
            <CardHeader className="flex flex-col">
              <CardDescription>
                <h1 className="text-secondary space-y-1 text-[32px] font-bold">
                  Entre na sua conta
                </h1>
                <span className="text-muted-foreground text-center text-lg font-medium">
                  Insira seus dados abaixo.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Digite seu e-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputPassword
                        placeholder="Digite seu e-mail"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Fazer login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center justify-center">
        <p className="text-muted-foreground text-center opacity-50">
          Ainda não possui uma conta?
        </p>
        <Button variant="link" className={'px-1 text-amber-100'} asChild>
          <Link to={ROUTES_KEYS.AUTH.SIGNUP}>Crie agora</Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
