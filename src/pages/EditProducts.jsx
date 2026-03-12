import { useState, useEffect } from "react";
import { productAPI } from "../services/api";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = searchTerm ? { search: searchTerm } : {};
      const response = await productAPI.getAll(params);
      setProducts(response.data.content || response.data || []);
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        category: product.category || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category || "",
        available: formData.stock > 0,
      };

      if (editingProduct) {
        await productAPI.update(editingProduct.id, productData);
        toast.success("Product updated successfully!");
      } else {
        const imageFile = document.getElementById("imageFile")?.files[0];

        if (imageFile) {
          await productAPI.create(productData, imageFile);
        } else {
          await productAPI.createSimple(productData);
        }

        toast.success("Product created successfully!");
      }

      handleCloseModal();
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productAPI.delete(id);
      toast.success("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      toast.error("Failed to delete product");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Manage Products</h1>

        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center space-x-2"
        >
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

      {/* Table */}

      {loading ? (
        <div className="card p-6">
          Loading products...
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
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>

              </thead>

              <tbody>

                {products.map((product) => (

                  <tr key={product.id} className="border-b hover:bg-gray-50">

                    <td className="py-3 px-4">
                      <img
                        src={
                          product.id
                            ? `/api/products/${product.id}/image`
                            : `https://via.placeholder.com/50`
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>

                    <td className="py-3 px-4 font-semibold">
                      {product.name}
                    </td>

                    <td className="py-3 px-4">
                      {formatPrice(product.price)}
                    </td>

                    <td className="py-3 px-4">
                      {product.stock || 0} in stock
                    </td>

                    <td className="py-3 px-4">

                      <div className="flex items-center space-x-2">

                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
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
              No products found
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AdminProducts;