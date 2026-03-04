import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

/* Public Pages */
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'

/* User Pages */
import Profile from './pages/Profile'
import Orders from './pages/Orders'

/* Admin Pages */
import AdminRegister from './pages/Admin/AdminRegister';
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminProducts from './pages/Admin/AdminProducts'
import AdminAddProduct from './pages/Admin/AddProduct'
import AdminEditProduct from './pages/EditProducts'

/* Route Guards */
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AdminRoute from './components/Auth/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
              <Routes>

                {/* ============ PUBLIC ROUTES ============ */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* ============ USER PROTECTED ROUTES ============ */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />

                {/* ============ ADMIN PANEL ROUTES ============ */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products/add"
                  element={
                    <AdminRoute>
                      <AdminAddProduct />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products/edit/:id"
                  element={
                    <AdminRoute>
                      <AdminEditProduct />
                    </AdminRoute>
                  }
                />

              </Routes>
            </main>

            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
  