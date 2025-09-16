import { useMutation } from '@tanstack/react-query'

import { UserService } from '../services/user'

export const signupMutationKey = ['signup']

export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })
}

export const loginMutationKey = ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })
}
