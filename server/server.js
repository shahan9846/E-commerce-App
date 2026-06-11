require('dotenv').config()
const express = require('express');
const cors = require('cors')
const connectDb = require('./config/db')

const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const addressRoutes = require('./routes/addressRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const cartRoutes = require('./routes/cartRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const orderRoutes = require('./routes/orderRoutes')

const PORT = process.env.PORT

connectDb()

const server = express()

server.use(cors())
server.use(express.json())

server.use('/api/register', registerRoutes)
server.use('/api/login', loginRoutes)
server.use('/api/auth/profile', profileRoutes)
server.use('/api/address', addressRoutes)
server.use('/api/product', productRoutes)
server.use('/api/cart', cartRoutes)
server.use('/api/wishlist',wishlistRoutes)
server.use('/api/category', categoryRoutes)
server.use('/api/auth/home', authRoutes)
server.use('/api/order', orderRoutes)
server.use("/uploads", express.static("uploads"));

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})