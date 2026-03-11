import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { orderAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout')
      navigate('/login')
      return
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    try {
      setProcessing(true)
      // Backend Order model: username, status, total
      const orderData = {
        username: user.username,
        total: getCartTotal(),
        // Note: Backend Order model doesn't have items field in the entity
        // You may need to add order items separately or update backend
      }

      await orderAPI.create(orderData)
      clearCart()
      toast.success('Order placed successfully!')
      navigate('/orders')
    } catch (error) {
      toast.error('Failed to place order')
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Start adding some products to your cart!</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = item.product || item
            const price = product.price || item.price || 0
            const itemTotal = price * item.quantity

            return (
              <div key={item.id || item.productId} className="card p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
<<<<<<< HEAD
                    src={product.id ? `/api/products/${product.id}/image` : `https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`}
=======
                    src={product.id ? `http://16.171.170.96:8080/api/products/${product.id}/image` : `https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`}
>>>>>>> b48ea12a6f1ce7f6114c08c282a68a129caf9275
                    alt={product.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(product.name)}`
                    }}
                  />
                  <div className="flex-1">
                    <Link
                      to={`/products/${product.id || item.productId}`}
                      className="text-xl font-semibold hover:text-primary-600 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => updateQuantity(item.id || item.productId, item.quantity - 1)}
                          className="p-1 border rounded hover:bg-gray-100 transition-colors"
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id || item.productId, item.quantity + 1)}
                          className="p-1 border rounded hover:bg-gray-100 transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-primary-600">
                          ${itemTotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id || item.productId)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            {!user && (
              <p className="text-sm text-gray-600 mt-4 text-center">
                <Link to="/login" className="text-primary-600 hover:underline">
                  Login
                </Link>
                {' '}to checkout
              </p>
            )}

            <Link
              to="/products"
              className="block text-center text-primary-600 hover:text-primary-700 mt-4"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
