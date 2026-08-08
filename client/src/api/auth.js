import api, { setAuthToken } from './axios.js'

function normalizeError(error) {
  const response = error?.response?.data
  const message = response?.error?.message || response?.message || error?.message || 'Unexpected error'
  return new Error(message)
}

export async function login(credentials) {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function register(credentials) {
  try {
    const response = await api.post('/auth/register', credentials)
    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}

export async function getCurrentUser(token) {
  try {
    setAuthToken(token)
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    throw normalizeError(error)
  }
}
