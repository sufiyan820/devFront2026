import axios from "axios";

// EC2 Backend URL
const API_BASE_URL = "http://16.171.170.96:8080";

// Axios instance
export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================
// REQUEST INTERCEPTOR
// ========================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========================
// RESPONSE INTERCEPTOR
// ========================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR:", error.response || error.message);
    return Promise.reject(error);
  }
);

// ========================
// AUTH API
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
// CART
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