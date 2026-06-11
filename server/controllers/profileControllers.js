const User = require('../models/authModels')
const Order = require('../models/orderModel')
const Product = require('../models/productModels')

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
};

const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            res.status(500).json({ message: 'User not found' })
            return
        }
        console.log(req.body)
        const { name, email, phone, dob, gender } = req.body
        const updateUser = await User.findByIdAndUpdate(req.userId, { name, email, phone, dob, gender }, { new: true })
        res.status(200).json({ updateUser, message: 'Profile updated' })
    } catch (error) {
        res.status(500).json({ message: 'Profile cannot updated' })
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        res.status(200).json({ totalUsers, totalOrders, totalProducts });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProfile, updateProfile, getAllCustomers, getAdminStats }