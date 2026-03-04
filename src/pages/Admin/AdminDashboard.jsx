import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Products Section */}
      <div className="p-4 border rounded shadow mb-4 hover:bg-gray-50">
        <h2 className="font-semibold mb-2">Products</h2>
        <div className="flex flex-col gap-2">
          <Link to="/admin/products" className="text-blue-600 hover:underline">
            Manage Products (Edit / Delete)
          </Link>
          <Link to="/admin/products/add" className="text-blue-600 hover:underline">
            Add New Product
          </Link>
        </div>
      </div>

      {/* Orders Section */}
      <div className="p-4 border rounded shadow mb-4 hover:bg-gray-50">
        <h2 className="font-semibold mb-2">Orders</h2>
        <div className="flex flex-col gap-2">
          <Link to="/admin/orders" className="text-blue-600 hover:underline">
            View All Orders
          </Link>
          <Link to="/admin/orders/update-status" className="text-blue-600 hover:underline">
            Update Order Status
          </Link>
        </div>
      </div>

      {/* Inventory / Stock Section */}
      <div className="p-4 border rounded shadow mb-4 hover:bg-gray-50">
        <h2 className="font-semibold mb-2">Inventory</h2>
        <div className="flex flex-col gap-2">
          <Link to="/admin/products/update-stock" className="text-blue-600 hover:underline">
            Update Product Stock
          </Link>
          <Link to="/admin/products/set-availability" className="text-blue-600 hover:underline">
            Set Product Availability
          </Link>
        </div>
      </div>

      {/* Settings Section */}
      <div className="p-4 border rounded shadow mb-4 hover:bg-gray-50">
        <h2 className="font-semibold mb-2">Settings</h2>
        <div className="flex flex-col gap-2">
          <Link to="/admin/settings" className="text-blue-600 hover:underline">
            General Settings
          </Link>
          <Link to="/admin/profile" className="text-blue-600 hover:underline">
            Admin Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
