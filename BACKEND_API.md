# Backend API Documentation

This document outlines the API endpoints needed for the UniCart application.

## Authentication Endpoints

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "buyer",
    "onboarding_completed": false,
    "avatar": null,
    "university": "",
    "rating": 0,
    "totalSales": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@university.edu",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "buyer",
    "onboarding_completed": true,
    "avatar": "https://example.com/avatar.jpg",
    "university": "University of Technology",
    "rating": 4.5,
    "totalSales": 10
  }
}
```

### POST /api/auth/onboarding
Complete user onboarding process.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "role": "seller",
  "university": "University of Technology",
  "preferences": {
    "categories": ["Electronics", "Books"],
    "notifications": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "seller",
    "onboarding_completed": true,
    "avatar": null,
    "university": "University of Technology",
    "rating": 0,
    "totalSales": 0,
    "preferences": {
      "categories": ["Electronics", "Books"],
      "notifications": true
    }
  }
}
```

### GET /api/auth/validate
Validate JWT token and return user data.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@university.edu",
    "role": "seller",
    "onboarding_completed": true,
    "avatar": null,
    "university": "University of Technology",
    "rating": 4.5,
    "totalSales": 10
  }
}
```

## Product Endpoints

### GET /api/products
Get all products with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search in title and description
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page

**Response:**
```json
{
  "products": [
    {
      "id": "product_123",
      "title": "MacBook Pro 2023",
      "description": "Excellent condition MacBook Pro",
      "price": 150000,
      "category": "Electronics",
      "condition": "like-new",
      "location": "Nairobi",
      "images": ["https://example.com/image1.jpg"],
      "seller": {
        "id": "user_123",
        "name": "John Doe",
        "rating": 4.5
      },
      "views": 25,
      "likes": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### GET /api/products/:id
Get a specific product by ID.

**Response:**
```json
{
  "product": {
    "id": "product_123",
    "title": "MacBook Pro 2023",
    "description": "Excellent condition MacBook Pro",
    "price": 150000,
    "category": "Electronics",
    "condition": "like-new",
    "location": "Nairobi",
    "images": ["https://example.com/image1.jpg"],
    "seller": {
      "id": "user_123",
      "name": "John Doe",
      "rating": 4.5,
      "totalSales": 10
    },
    "views": 25,
    "likes": 5,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Seller Endpoints

### GET /api/seller/products
Get products for the authenticated seller.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "products": [
    {
      "id": "product_123",
      "title": "MacBook Pro 2023",
      "price": 150000,
      "category": "Electronics",
      "condition": "like-new",
      "available": true,
      "views": 25,
      "likes": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /api/seller/products
Create a new product.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "MacBook Pro 2023",
  "description": "Excellent condition MacBook Pro",
  "price": 150000,
  "category": "Electronics",
  "condition": "like-new",
  "location": "Nairobi",
  "images": ["https://example.com/image1.jpg"]
}
```

### GET /api/seller/dashboard
Get seller dashboard statistics.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "stats": {
    "totalProducts": 15,
    "totalViews": 250,
    "totalLikes": 45,
    "monthlyRevenue": 75000,
    "recentOrders": [
      {
        "id": "order_123",
        "productTitle": "MacBook Pro 2023",
        "buyerName": "Jane Smith",
        "amount": 150000,
        "status": "completed",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "code": "ERROR_CODE"
}
```

Common HTTP status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found
- 500: Internal Server Error 