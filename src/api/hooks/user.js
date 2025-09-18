import { useMutation, useQuery } from '@tanstack/react-query'

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage'

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

export const meQueryKey = (accessToken) =>
  accessToken ? ['me', accessToken] : ['me']

export const useMe = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)

  return useQuery({
    queryKey: meQueryKey(accessToken),
    queryFn: async () => {
      const response = await UserService.me()
      return response
    },
    enabled: !!accessToken,
  })
}
