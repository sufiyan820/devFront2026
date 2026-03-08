import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  // ===== Fetch all products =====
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://16.171.170.96:8080/api/admin/products", {
        headers: { Authorization: "Bearer " + token.trim() },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== Delete product =====
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://16.171.170.96:8080/api/admin/products/${id}`, {
        headers: { Authorization: "Bearer " + token.trim() },
      });
      alert("Product deleted");
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      <Link
        to="/admin/products/add"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        + Add New Product
      </Link>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Price</th>
            <th className="border px-2 py-1">Stock</th>
            <th className="border px-2 py-1">Available</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">{p.price}</td>
              <td className="border px-2 py-1">{p.stock}</td>
              <td className="border px-2 py-1">{p.available ? "Yes" : "No"}</td>
              <td className="border px-2 py-1 flex gap-2">
                <button
                  onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
