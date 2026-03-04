import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

// 🔐 Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========================
// AUTH
// ========================

export const authAPI = {
  loginUser: (data) => api.post("/auth/login/user", data),
  loginAdmin: (data) => api.post("/auth/login/admin", data),
};

// ========================
// USERS
// ========================

export const userAPI = {
  register: (data) => api.post("/users/register", data),
  update: (id, data) => api.put(`/users/${id}/update`, data),
};

// ========================
// PRODUCTS
// ========================

export const productAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products/create", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// ========================
// CART (Backend Based)
// ========================

export const cartAPI = {
  getCart: () => api.get("/cart/get"),
  addToCart: (productId, quantity) =>
    api.post("/cart/add", { productId, quantity }),
  updateQuantity: (productId, quantity) =>
    api.put(`/cart/${productId}`, { quantity }),
  removeItem: (productId) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete("/cart/clear"),
};

// ========================
// ORDERS
// ========================

export const orderAPI = {
  placeOrder: (data) => api.post("/orders/placeOrder", data),
  getById: (id) => api.get(`/orders/${id}`),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
};