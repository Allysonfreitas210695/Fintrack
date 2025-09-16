import { api } from '@/lib/axios'

export const UserService = {
  /**
   * Cria um novo usuário.
   * @param {Object} input - Usuário a ser criado.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário autenteicado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  login: async (input) => {
    try {
      const response = await api.post('/users/login', {
        email: input.email,
        password: input.password,
      })
      return {
        id: response.data.id,
        email: response.data.email,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        tokens: response.data.tokens,
      }
    } catch (error) {
      throw error
    }
  },
  /**
   * Cria um novo usuário.
   * @param {Object} input - Usuário a ser criado.
   * @param {string} input.firstName - Primeiro nome do usuário.
   * @param {string} input.lastName - Sobrenome do usuário.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário criado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  signup: async (input) => {
    const response = await api.post('/users', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    })
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    }
  },
}
