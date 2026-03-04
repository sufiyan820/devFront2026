import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.available && product.stock > 0) {
      addToCart(product, 1)
    } else {
      toast.error('Product is not available')
    }
  }

  // Use backend image endpoint
  const imageUrl = product.id 
    ? `http://localhost:8080/api/store/products/${product.id}/image`
    : `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`

  return (
    <Link to={`/products/${product.id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`
          }}
        />
        {product.available && product.stock > 0 && (
          <button
            onClick={handleAddToCart}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-600 hover:text-white"
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
        {product.category && (
          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded mb-2">
            {product.category}
          </span>
        )}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            ${product.price?.toFixed(2) || '0.00'}
          </span>
          <span className={`text-sm font-semibold ${
            product.available && product.stock > 0 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {product.available && product.stock > 0 
              ? `${product.stock} in stock` 
              : 'Out of Stock'}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
