import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

import { InputPassword } from '@/components/input-password'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ROUTES_KEYS } from '@/routes/routes.keys'

export const formSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório.',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório.',
    }),
    email: z
      .email({
        message: 'O e-mail é inválido.',
      })
      .trim()
      .min(1, {
        message: 'O e-mail é obrigatório.',
      }),
    password: z.string().trim().min(6, {
      message: 'A senha deve ter no mínimo 6 caracteres.',
    }),
    passwordConfirmation: z.string().trim().min(6, {
      message: 'A confirmação de senha é obrigatória.',
    }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Você precisa aceitar os termos.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem.',
    path: ['passwordConfirmation'],
  })

const SignupPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })

  function handleSubmit(data) {
    console.log(data)
  }

  return (
    <ScrollArea className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <div className="flex h-full w-full flex-col items-center justify-center gap-3">
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
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Digite seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Digite seu sobrenome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          placeholder="Digite sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputPassword
                          placeholder="Digite sua senha novamente"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="items-top flex space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="leading-none">
                        <label
                          htmlFor="terms"
                          className={`text-muted-foreground text-xs opacity-75 ${form.formState.errors.terms && 'text-red-500'}`}
                        >
                          Ao clicar em “Criar conta”, você aceita{' '}
                          <a
                            href="#"
                            className={`text-white underline ${form.formState.errors.terms && 'text-red-500'}`}
                          >
                            nosso termo de uso e política de privacidade.
                          </a>
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Criar conta
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center pb-4">
        <p className="text-muted-foreground text-center opacity-50">
          já possui um conta ?
        </p>
        <Button
          variant="link"
          className={'px-1'}
          asChild
          disabled={form.formState.isSubmitting}
        >
          <Link to={ROUTES_KEYS.AUTH.LOGIN}>Faça login</Link>
        </Button>
      </div>
    </ScrollArea>
  )
}

export default SignupPage
