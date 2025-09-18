import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { loginSchemaForm, signupSchemaForm } from '../schemas/user'

export const useLoginForm = () => {
  return useForm({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: {
      email: '',
      password: '',
    },
  })
}

export const useSignupForm = () => {
  return useForm({
    resolver: zodResolver(signupSchemaForm),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  })
}
