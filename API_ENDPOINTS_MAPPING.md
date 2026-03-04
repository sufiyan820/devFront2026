# Complete API Endpoints Mapping

## Backend Controllers → Frontend API Calls

### ✅ Authentication (`/api/auth`)
**Backend: AuthController**
- `POST /api/auth/login` → `authAPI.login()`
  - Request: `{ username, password }`
  - Response: `String` (JWT token)
  
- `POST /api/auth/register` → `authAPI.register()`
  - Request: `{ username, email, password }`
  - Response: `User` object
  
- `POST /api/auth/admin/register` → `authAPI.registerAdmin()`
  - Request: `{ username, email, password }`
  - Response: `User` object

### ✅ Public Products
**Backend: UserProductController** (`/api/store/products`)
- `GET /api/store/products` → `productAPI.getAll()`
- `GET /api/store/products/{id}` → `productAPI.getById(id)`
- `GET /api/store/products/{id}/image` → `productAPI.getImage(id)`

**Backend: ProductController** (`/api/products`) - Alternative
- `GET /api/products` → `productAPI.getAllAlt()`
- `GET /api/products/{id}/image` → `productAPI.getImageAlt(id)`

### ✅ Admin Products
**Backend: AdminProductController** (`/api/admin/products`)
- `POST /api/admin/products` → `productAPI.create(product, imageFile)`
  - Content-Type: `multipart/form-data`
  - FormData: `product` (JSON blob), `image` (file)
  - Requires: ADMIN role

**Backend: AdminController** (`/api/admin/product`)
- `POST /api/admin/product` → `productAPI.createSimple(product)`
  - Content-Type: `application/json`
  - Body: Product object
  
- `PUT /api/admin/product/{id}` → `productAPI.update(id, product)`
  - Content-Type: `application/json`
  
- `DELETE /api/admin/product/{id}` → `productAPI.delete(id)`

### ✅ User Orders
**Backend: UserController** (`/api/user`)
- `GET /api/user/products` → Not used in frontend (duplicate of store/products)
- `POST /api/user/order` → `orderAPI.create(orderData)`
  - Body: `{ username, total }` (status set to "PLACED" by backend)
  - Note: Order model doesn't have items field - only username, status, total
  
- `GET /api/user/orders/{username}` → `orderAPI.getByUsername(username)`

### ⚠️ Cart Management
**Backend: NO CART API** - Cart is managed client-side only
- Cart stored in `localStorage`
- When checkout, cart items are converted to order with total amount
- No backend cart persistence

### ✅ Admin Orders
**Backend: AdminController** (`/api/admin`)
- `GET /api/admin/orders` → `orderAPI.getAllAdmin()`
  
- `PUT /api/admin/orders/{id}/status` → `orderAPI.updateStatus(id, status)`
  - Content-Type: `text/plain`
  - Body: Status string (not JSON)

## Fixed Issues

1. ✅ **Cart API**: Removed non-existent cart API calls - cart is now client-side only
2. ✅ **AdminProductController multipart/form-data**: Sends product as JSON Blob in FormData
3. ✅ **Order Status Update**: Sends status as plain text string
4. ✅ **Product Images**: Uses `/api/store/products/{id}/image` endpoint
5. ✅ **CORS**: Frontend port 5173 matches backend CORS configuration

## Potential Issues

1. **Order Creation**: 
   - Backend Order model only has: `id, username, status, total`
   - No items/orderItems field in the entity
   - Frontend sends `{ username, total }` - correct ✅

2. **AdminProductController**:
   - Requires both `product` (JSON) and `image` (file) in FormData
   - If image is missing, use `/api/admin/product` endpoint instead

3. **Product Image Display**:
   - Images are byte arrays served from backend
   - Frontend uses direct image URL: `http://localhost:8080/api/store/products/{id}/image`

## Testing Checklist

- [ ] Login returns JWT token string
- [ ] Register returns User object
- [ ] Product list loads from `/api/store/products`
- [ ] Product images load from `/api/store/products/{id}/image`
- [ ] Admin can create product with image (multipart)
- [ ] Admin can create product without image (JSON)
- [ ] Admin can update product
- [ ] Admin can delete product
- [ ] User can place order
- [ ] User can view their orders
- [ ] Admin can view all orders
- [ ] Admin can update order status
