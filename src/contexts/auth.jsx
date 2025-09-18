import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

import { useLogin, useMe, useSignup } from '@/api/hooks/user'
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(false)

  const loginMutation = useLogin()
  const useSignupMutation = useSignup()
  const { data: me, isLoading, isError } = useMe()

  const login = async (userData) => {
    {
      try {
        const reponse = await loginMutation.mutateAsync(userData)
        handleUserLogged(reponse)
        toast.success('Login realizado com sucesso!')
      } catch {
        handleUserLogged(null)
        handleRemoveTokens()

        toast.error('Erro ao fazer login. Tente novamente.')
      }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await useSignupMutation.mutateAsync(userData)
      handleUserLogged(response)
      toast.success(
        'Conta criada com sucesso! Verifique seu e-mail para ativar a conta.'
      )
    } catch {
      handleUserLogged(null)
      handleRemoveTokens()

      toast.error(
        'Erro ao criar conta. Verifique seus dados e tente novamente.'
      )
    }
  }

  const signOut = () => {
    handleUserLogged(null)
    handleRemoveTokens()
    toast.success('Logout realizado com sucesso!')
  }

  const handleTokens = (tokens) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
  }

  const handleRemoveTokens = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
  }

  const handleUserLogged = useCallback((userData) => {
    setUser(userData)
    if (userData?.tokens) {
      handleTokens(userData.tokens)
    }
  }, [])

  useEffect(() => {
    setIsInitializing(isLoading)
    if (me) {
      handleUserLogged(me)
    } else if (isError) {
      handleUserLogged(null)
      handleRemoveTokens()
    }
  }, [me, isError, isLoading, handleUserLogged])

  return (
    <AuthContext.Provider
      value={{ user, isInitializing, login, signup, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Inicialização do AuthContext falhou')
  }
  return context
}
