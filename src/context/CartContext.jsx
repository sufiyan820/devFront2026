import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // Load cart from localStorage (client-side only - backend doesn't have cart API)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  const addToCart = async (product, quantity = 1) => {
    try {
      // Cart is managed client-side only (backend doesn't have cart API)
      const existingItem = cart.find(item => item.productId === product.id || item.product?.id === product.id)
      const updatedCart = existingItem
        ? cart.map(item =>
            (item.productId === product.id || item.product?.id === product.id)
              ? { ...item, quantity: item.quantity + quantity, product }
              : item
          )
        : [...cart, { productId: product.id, product, quantity }]
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
      console.error(error)
    }
  }

  const updateQuantity = async (itemId, quantity) => {
    try {
      // Cart is managed client-side only
      const updatedCart = cart.map(item =>
        (item.productId === itemId || item.id === itemId)
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } catch (error) {
      toast.error('Failed to update cart')
      console.error(error)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      // Cart is managed client-side only
      const updatedCart = cart.filter(item => 
        item.productId !== itemId && item.id !== itemId
      )
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      toast.success('Removed from cart')
    } catch (error) {
      toast.error('Failed to remove from cart')
      console.error(error)
    }
  }

  const clearCart = async () => {
    try {
      // Cart is managed client-side only
      localStorage.removeItem('cart')
      setCart([])
    } catch (error) {
      toast.error('Failed to clear cart')
      console.error(error)
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product?.price || item.price || 0
      return total + price * item.quantity
    }, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
