

import { STORAGE_KEYS } from '../constants'

export const getCartFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART_DATA)
    return stored ? JSON.parse(stored) : []
  } catch (err) {
    console.error('Error reading cartData from localStorage:', err)
    return []
  }
}

export const saveCartToLocalStorage = (cartList) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(cartList))
  } catch (err) {
    console.error('Error saving cartData to localStorage:', err)
  }
}

export const clearCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART_DATA)
  } catch (err) {
    console.error('Error clearing cartData from localStorage:', err)
  }
}

export const calculateItemTotal = (cost, quantity) => Number(cost) * Number(quantity)

export const calculateOrderTotal = (cartList = []) =>
  cartList.reduce((acc, item) => acc + calculateItemTotal(item.cost, item.quantity), 0)
