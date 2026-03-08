import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productAPI } from '../services/api'
import { useCart } from '../context/CartContext'
import { FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const response = await productAPI.getById(id)
      setProduct(response.data)
    } catch (error) {
      toast.error('Failed to load product')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  const increaseQuantity = () => {
    const maxQuantity = product?.stock || 999
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600 text-lg mb-4">Product not found</p>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Back to Products
        </button>
      </div>
    )
  }

  // Use backend image endpoint
  const imageUrl = product.id 
    ? `/api/products/${product.id}/image`
    : `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="card">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/600x600?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="text-3xl font-bold text-primary-600 mb-6">
            ${product.price?.toFixed(2) || '0.00'}
          </div>

          {product.category && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>
          )}

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description || 'No description available.'}</p>
          </div>

          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.available && product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.available && product.stock > 0 
                ? `${product.stock} in stock` 
                : 'Out of stock'}
            </span>
          </div>

          {/* Quantity Selector */}
          {product.available && product.stock > 0 && (
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          {product.available && product.stock > 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-lg"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
