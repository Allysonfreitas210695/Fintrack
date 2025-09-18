import { Loader2Icon } from 'lucide-react'
import { Link, Navigate } from 'react-router'

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
import { useAuth } from '@/contexts/auth'
import { useSignupForm } from '@/forms/hooks/user'
import { ROUTES_KEYS } from '@/routes/routes.keys'

const SignupPage = () => {
  const { signup } = useAuth()

  const form = useSignupForm()

  const handleSubmit = async (data) => await signup(data)

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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="animate-spin" />
                  )}
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
          className={'px-1 text-amber-100'}
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
