import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productAPI, orderAPI } from '../../services/api'
import { FaBox, FaShoppingCart, FaDollarSign, FaUsers } from 'react-icons/fa'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      // Load products
      const productsResponse = await productAPI.getAll()
      const products = productsResponse.data || []
      
      // Load orders
      const ordersResponse = await orderAPI.getAllAdmin()
      const orders = ordersResponse.data || []
      
      const revenue = orders.reduce((sum, order) => sum + (order.total || order.totalAmount || 0), 0)

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: revenue,
        totalUsers: 0, // Would need user API
      })
      
      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <FaBox className="text-3xl" />,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FaShoppingCart className="text-3xl" />,
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: <FaDollarSign className="text-3xl" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="text-3xl" />,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/products" className="btn-primary">
          Manage Products
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            to={stat.link || '#'}
            className={`card p-6 ${stat.link ? 'hover:shadow-xl transition-shadow cursor-pointer' : ''}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-4 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        ) : recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">
                      {order.username || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'PENDING' || order.status === 'PLACED' 
                          ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'COMPLETED' || order.status === 'DELIVERED' 
                          ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status || 'PLACED'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      ${(order.total || order.totalAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No recent orders</p>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
