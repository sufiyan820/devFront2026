# Ecommerce Frontend

A modern, responsive ecommerce frontend built with React, Vite, and Tailwind CSS.

## Features

- 🛍️ **Product Browsing**: Browse and search products with filters
- 🛒 **Shopping Cart**: Add products to cart and manage quantities
- 👤 **User Authentication**: Login and registration system
- 📦 **Order Management**: View order history and track orders
- 👨‍💼 **Admin Dashboard**: Manage products and view analytics
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🎨 **Modern UI**: Beautiful, intuitive user interface

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8080/api
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Header, Footer
│   └── Product/        # Product-related components
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── pages/              # Page components
│   ├── Admin/          # Admin pages
│   ├── Home.jsx        # Homepage
│   ├── Products.jsx    # Product listing
│   ├── ProductDetail.jsx
│   ├── Cart.jsx        # Shopping cart
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Profile.jsx     # User profile
│   └── Orders.jsx      # Order history
└── services/           # API services
    └── api.js          # API client configuration
```

## API Integration

The frontend expects a Spring Boot backend with the following endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/admin/products` - Create product (Admin)
- `PUT /api/admin/products/:id` - Update product (Admin)
- `DELETE /api/admin/products/:id` - Delete product (Admin)

### Cart
- `GET /api/user/cart` - Get user cart
- `POST /api/user/cart` - Add to cart
- `PUT /api/user/cart/:id` - Update cart item
- `DELETE /api/user/cart/:id` - Remove from cart

### Orders
- `POST /api/user/orders` - Create order
- `GET /api/user/orders` - Get user orders
- `GET /api/admin/orders` - Get all orders (Admin)

## Environment Variables

- `VITE_API_URL` - Backend API base URL (default: http://localhost:8080/api)

## Features in Detail

### Shopping Cart
- Add/remove products
- Update quantities
- Guest cart support (localStorage)
- Persistent cart for logged-in users

### Admin Panel
- Product management (CRUD)
- Order overview
- Dashboard with statistics

### User Features
- Profile management
- Order history
- Secure authentication

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
