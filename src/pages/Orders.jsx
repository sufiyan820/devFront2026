import { useState, useEffect } from 'react'
import { orderAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { FaBox, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadOrders()
    }
  }, [user])

  const loadOrders = async () => {
    if (!user?.username) return
    
    try {
      setLoading(true)
      const response = await orderAPI.getByUsername(user.username)
      setOrders(response.data || [])
    } catch (error) {
      toast.error('Failed to load orders')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return <FaClock className="text-yellow-500" />
      case 'COMPLETED':
      case 'DELIVERED':
        return <FaCheckCircle className="text-green-500" />
      case 'CANCELLED':
        return <FaTimesCircle className="text-red-500" />
      default:
        return <FaBox className="text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED':
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">
                    {order.username && `Ordered by: ${order.username}`}
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-semibold capitalize">
                      {order.status?.toLowerCase().replace('_', ' ') || 'PLACED'}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-primary-600">
                    ${order.total?.toFixed(2) || order.totalAmount?.toFixed(2) || '0.00'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
