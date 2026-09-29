import Cookies from 'js-cookie'
import { STORAGE_KEYS } from '../constants'

export const getJwtToken = () =>
  Cookies.get(STORAGE_KEYS.JWT_TOKEN) || localStorage.getItem(STORAGE_KEYS.JWT_TOKEN)

export const setJwtToken = (token) => {
  Cookies.set(STORAGE_KEYS.JWT_TOKEN, token, { expires: 30 })
  localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token)
}

export const removeJwtToken = () => {
  Cookies.remove(STORAGE_KEYS.JWT_TOKEN)
  localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN)
}

export const isAuthenticated = () => Boolean(getJwtToken())
