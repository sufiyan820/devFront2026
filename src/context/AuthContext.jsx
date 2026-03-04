import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper function to decode JWT and extract user info
const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    return {
      username: decoded.sub || decoded.username,
      role: decoded.role || 'USER',
    }
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
      } else {
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

 const login = async (credentials, role = "USER") => {
  let response;
  let token;

  if (role === "ADMIN") {
    response = await authAPI.loginAdmin(credentials);
    token = response.data;
  } else {
    response = await authAPI.loginUser(credentials);
    token = response.data.token;
  }

  localStorage.setItem("token", token);

  const decoded = decodeToken(token);
  if (decoded) {
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
  }

  return { token, user: decoded };
};

  const register = async (userData) => {
    // Backend returns User object (not token)
    const response = await authAPI.register(userData)
    const registeredUser = response.data
    
    // After registration, automatically login to get token
    try {
      const loginResponse = await authAPI.login({
        username: userData.username,
        password: userData.password,
      })
      const token = loginResponse.data
      localStorage.setItem('token', token)
      
      const decoded = decodeToken(token)
      if (decoded) {
        setUser(decoded)
        localStorage.setItem('user', JSON.stringify(decoded))
      }
      
      return { token, user: decoded }
    } catch (error) {
      // If auto-login fails, still set user from registration
      setUser({
        username: registeredUser.username,
        role: registeredUser.role?.name() || 'USER',
      })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAdmin = () => {
    return user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN'
  }

  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
