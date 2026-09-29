import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
})

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(() => {
    try {
      const stored = localStorage.getItem('cartData')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('cartData', JSON.stringify(cartList))
    } catch (e) {
      console.error('Failed to save cartData to localStorage:', e)
    }
  }, [cartList])

  const addCartItem = (product) => {
    setCartList((prevList) => {
      const itemIndex = prevList.findIndex((item) => item.id === product.id)
      if (itemIndex !== -1) {
        return prevList.map((item, index) => {
          if (index === itemIndex) {
            return {
              ...item,
              quantity: item.quantity + (product.quantity || 1),
            }
          }
          return item
        })
      }
      return [
        ...prevList,
        {
          id: product.id,
          name: product.name,
          cost: product.cost,
          imageUrl: product.imageUrl,
          quantity: product.quantity || 1,
        },
      ]
    })
  }

  const incrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
    )
  }

  const decrementCartItemQuantity = (id) => {
    setCartList((prevList) =>
      prevList
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const removeCartItem = (id) => {
    setCartList((prevList) => prevList.filter((item) => item.id !== id))
  }

  const removeAllCartItems = () => {
    setCartList([])
    localStorage.removeItem('cartData')
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default CartContext
