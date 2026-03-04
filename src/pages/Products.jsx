import { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import ProductCard from '../components/Product/ProductCard'
import { FaSearch, FaFilter } from 'react-icons/fa'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [searchTerm, sortBy])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getAll()
      let products = response.data || []
      
      // Client-side filtering and sorting
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        products = products.filter(p => 
          p.name?.toLowerCase().includes(term) || 
          p.description?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term)
        )
      }
      
      if (sortBy === 'price') {
        products.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'priceDesc') {
        products.sort((a, b) => b.price - a.price)
      } else {
        products.sort((a, b) => a.name.localeCompare(b.name))
      }
      
      setProducts(products)
    } catch (error) {
      console.error('Failed to load products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price: Low to High</option>
              <option value="priceDesc">Sort by Price: High to Low</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" className="input-field" /> 
                  <input type="number" placeholder="Max" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="input-field">
                  <option>All Categories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Availability</label>
                <select className="input-field">
                  <option>All</option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
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
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products
