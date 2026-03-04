import { useState, useEffect } from 'react'
import { productAPI } from '../services/api'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'
import toast from 'react-hot-toast'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  })

  useEffect(() => {
    loadProducts()
  }, [searchTerm])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const params = searchTerm ? { search: searchTerm } : {}
      const response = await productAPI.getAll(params)
      setProducts(response.data.content || response.data || [])
    } catch (error) {
      toast.error('Failed to load products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category || '',
        available: formData.stock > 0,
      }

      if (editingProduct) {
        await productAPI.update(editingProduct.id, productData)
        toast.success('Product updated successfully!')
      } else {
        // Check if image file is provided
        const imageFile = document.getElementById('imageFile')?.files[0]
        if (imageFile) {
          // Use multipart/form-data endpoint
          await productAPI.create(productData, imageFile)
        } else {
          // Use simple JSON endpoint (AdminController)
          await productAPI.createSimple(productData)
        }
        toast.success('Product created successfully!')
      }

      handleCloseModal()
      loadProducts()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product')
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await productAPI.delete(id)
      toast.success('Product deleted successfully!')
      loadProducts()
    } catch (error) {
      toast.error('Failed to delete product')
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Manage Products</h1>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center space-x-2">
          <FaPlus />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      {loading ? (
        <div className="card p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Actions</th>0
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img
                        src={product.id ? `http://localhost:8080/api/product/add/${product.id}/image` : `https://via.placeholder.com/50?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/50?text=${encodeURIComponent(product.name)}`
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 font-semibold">{product.name}</td>
                    <td className="py-3 px-4">${product.price?.toFixed(2) || '0.00'}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          product.available && product.stock > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock || 0} in stock
                        </span>
                        {product.category && (
                          <span className="text-xs text-gray-500">{product.category}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          aria-label="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          aria-label="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      name="price"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      required
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Electronics, Clothing"
                  />
                </div>
                {!editingProduct && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image
                    </label>
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      className="input-field"
                    />
                  </div>
                )}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProduct ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
