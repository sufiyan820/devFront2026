import { Link } from 'react-router-dom'
import { FaArrowRight, FaShoppingBag, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { productAPI } from '../services/api'

import ProductCard from '../components/Product/ProductCard'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const loadFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAll()
      const products = response.data || []
      // Show first 8 products as featured
      setFeaturedProducts(products.slice(0, 8))
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <FaShoppingBag className="text-4xl" />,
      title: 'Wide Selection',
      description: 'Browse thousands of products from top brands',
    },
    {
      icon: <FaTruck className="text-4xl" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: 'Secure Payment',
      description: 'Your transactions are safe and encrypted',
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: '24/7 Support',
      description: 'Our team is always here to help you',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Family Mart - Your Trusted Online Store 
            </h1>
            <h2>

              CREATED BY ABU SUFIYAN DEVOPS ENGINEER 🤖

            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, secure delivery. At Family Mart, we put your needs first.
            </p>
            <Link to="/products" className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <span>Shop Now</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-primary-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-2">
              <span>View All</span>
              <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
