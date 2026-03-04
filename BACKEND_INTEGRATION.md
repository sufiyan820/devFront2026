# Backend Integration Notes

## API Endpoints Mapping

### Authentication (`/api/auth`)
- ✅ `POST /api/auth/login` - Returns JWT token (string)
- ✅ `POST /api/auth/register` - Returns User object
- ✅ `POST /api/auth/admin/register` - Returns User object

### Products (`/api/store/products` - Public)
- ✅ `GET /api/store/products` - Get all products
- ✅ `GET /api/store/products/{id}` - Get product by ID
- ✅ `GET /api/store/products/{id}/image` - Get product image (byte array)

### Admin Products (`/api/admin/products` or `/api/admin/product`)
- ✅ `POST /api/admin/products` - Create product with image (multipart/form-data)
- ✅ `POST /api/admin/product` - Create product without image (JSON)
- ✅ `PUT /api/admin/product/{id}` - Update product
- ✅ `DELETE /api/admin/product/{id}` - Delete product

### User Orders (`/api/user`)
- ✅ `POST /api/user/order` - Create order (requires: username, total)
- ✅ `GET /api/user/orders/{username}` - Get user orders

### Admin Orders (`/api/admin`)
- ✅ `GET /api/admin/orders` - Get all orders
- ✅ `PUT /api/admin/orders/{id}/status` - Update order status (text/plain)

## Data Models

### Product
```javascript
{
  id: Long,
  name: String,
  description: String,
  price: double,
  stock: int,
  category: String,
  available: boolean,
  imageName: String,
  imageType: String,
  imageData: byte[]
}
```

### User
```javascript
{
  id: Long,
  username: String,
  email: String,
  password: String,
  role: Role (USER | ADMIN)
}
```

### Order
```javascript
{
  id: Long,
  username: String,
  status: String,
  total: double
}
```

## Important Notes

1. **JWT Token**: Login returns only the token string, not a user object. The frontend decodes the JWT to extract user information.

2. **Product Images**: Images are served as byte arrays from `/api/store/products/{id}/image`. The frontend uses this endpoint directly in `<img src>` tags.

3. **Admin Product Creation**: Two endpoints available:
   - `/api/admin/products` - Requires multipart/form-data with product JSON and image file
   - `/api/admin/product` - Simple JSON endpoint (no image upload)

4. **Order Structure**: Backend Order model is simple (username, status, total). No items array in the entity.

5. **CORS**: Backend is configured for `http://localhost:5173` (Vite default port).

## Backend Issues Found

⚠️ **AdminController** is missing `@RestController` and `@RequestMapping("/api/admin")` annotations. You may need to add these:

```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    // ... existing code
}
```

## Frontend Configuration

- **API Base URL**: `http://localhost:8080/api` (configurable via `.env`)
- **Frontend Port**: `5173` (matches backend CORS)
- **JWT Storage**: Token stored in `localStorage` as `token`
- **User Info**: Decoded from JWT and stored in `localStorage` as `user`
