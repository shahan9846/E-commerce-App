# Fragraniza

Fragraniza is a premium, full-stack e-commerce web application specifically tailored for fragrance and perfume retail. Designed with the modern MERN (MongoDB, Express, React, Node.js) stack, it offers a seamless shopping experience for customers and a comprehensive administrative portal for inventory and order management.

---

## Key Features

### Customer Experience
*   **User Authentication & Security:** Secure registration and login using JWT (JSON Web Tokens) and passwords hashed with `bcrypt`.
*   **Dynamic Product Browser:** Browse perfumes by categories with search and filter capability.
*   **Interactive Cart & Wishlist:** Seamlessly add products to the cart or wishlist with instant UI updates.
*   **Address Management:** Add, update, and manage multiple delivery addresses.
*   **Secure Payment Integration:** Integrated with **Razorpay Payment Gateway** for fast, reliable, and secure online checkouts.
*   **Order Tracking:** Review past orders and order history in the user profile page.

### Admin Management Portal
*   **Statistical Dashboard:** Monitor sales, customer growth, and inventory health.
*   **Product Catalog Management (CRUD):** Add, update, or remove products (supported by `multer` for secure, server-side image uploads).
*   **Category Management:** Dynamically create, rename, or delete product categories.
*   **Order Dispatcher:** Real-time visibility into all customer orders, allowing status updates.
*   **Customer Directory:** Access and view a database of registered users.

---

## Technology Stack

### Frontend (Client)
*   **Framework:** React 19 (built on Vite for lightning-fast bundling)
*   **Routing:** React Router DOM v7
*   **API Client:** Axios (configured with intercepts for private route authentication)
*   **UI Notifications & Modals:** SweetAlert2, React Toastify, and Sonner

### Backend (Server)
*   **Runtime Environment:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB via Mongoose ODM
*   **Authentication:** JSON Web Tokens (JWT) & bcrypt encryption
*   **File Uploads:** Multer
*   **Payment Gateway:** Razorpay Node SDK


---

## Setup & Configuration

### Prerequisites
Before running the application, make sure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas URI)

### Backend Configuration
Create a `.env` file inside the `server` directory and configure the environment variables:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_signing_secret

# Razorpay credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

---

## Getting Started

### 1. Start the Backend Server
Navigate to the `server` directory, install the dependencies, and start the development server:
```bash
cd server
npm install
npm start
```
The server will start on `http://localhost:5000` (or the port specified in your `.env`).

### 2. Start the Frontend Client
Navigate to the `client` directory, install the dependencies, and start the development server:
```bash
cd client
npm install
npm run dev
```
The client will start, and the console will output a local address (usually `http://localhost:5173`).

---

## Core API Endpoints

The server exposes the following REST API endpoints:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/register` | Register a new user account | No |
| **POST** | `/api/login` | Login to account & retrieve token | No |
| **GET** | `/api/product` | Fetch all products / search filter | No |
| **GET** | `/api/product/:id` | Fetch details of a single product | No |
| **POST** | `/api/product` | Add a new product (with image upload) | Admin |
| **PUT** | `/api/product/:id` | Edit details of an existing product | Admin |
| **DELETE** | `/api/product/:id` | Delete a product from inventory | Admin |
| **GET** | `/api/category` | Retrieve all product categories | No |
| **POST** | `/api/category` | Create a new category | Admin |
| **GET** | `/api/cart` | Retrieve user's shopping cart | User |
| **POST** | `/api/cart` | Add / Update quantity of items in cart | User |
| **DELETE** | `/api/cart/:id` | Remove an item from the cart | User |
| **POST** | `/api/order` | Place a new order / initiate payment | User |
| **GET** | `/api/order` | Retrieve user order history / all orders | User / Admin |

---


