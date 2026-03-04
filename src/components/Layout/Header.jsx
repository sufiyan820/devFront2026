import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Header = () => {
  const { user, logout, isAdmin } = useAuth()
  const { getCartItemCount } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-600">Family Mart</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            {user ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Orders
                </Link>
                {isAdmin() && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">
                    Admin
                  </Link>
                )}
              </>
            ) : null}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              {getCartItemCount() > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>

            {user ? (
  <div className="hidden md:flex items-center space-x-4">
    <Link
      to="/profile"
      className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
    >
      <FaUser />
      <span>{user.username || user.email}</span>
    </Link>

    {isAdmin() && (
      <Link
        to="/admin/dashboard"
        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Admin
      </Link>
    )}

    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
    >
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  </div>
) : (
  <div className="hidden md:flex items-center space-x-4">
    <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
      Login
    </Link>

    <Link
      to="/admin/login"
      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Admin Login
    </Link>

    <Link to="/register" className="btn-primary">
      Sign Up
    </Link>
  </div>
)}


            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              {user ? (
                <>
                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-primary-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
  to="/login"
  className="text-gray-700 hover:text-primary-600 transition-colors"
  onClick={() => setMobileMenuOpen(false)}
>
  Login
</Link>

<Link
  to="/admin/login"
  className="text-blue-600 font-semibold"
  onClick={() => setMobileMenuOpen(false)}
>
  Admin Login
</Link>

<Link
  to="/register"
  className="text-gray-700 hover:text-primary-600 transition-colors"
  onClick={() => setMobileMenuOpen(false)}
>
  Sign Up
</Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
