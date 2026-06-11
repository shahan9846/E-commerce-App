const Product = require('../models/productModels')

const postProduct = async (req, res) => {
    try {
        const { name, stock, price, salePrice, category, description } = req.body
        const image = req.file.filename

        await Product.create({
            name,
            price,
            stock,
            description,
            category,
            salePrice,
            image
        })
        res.status(201).json({ message: "Product uploaded successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'server error'
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.find().populate('category')
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error fetching products" })
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId).populate('category')
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error fetching product" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error deleting product" })
    }
}

const editProduct = async (req, res) => {
    try {
        let updatedData = { ...req.body }
        if (req.file) {
            updatedData.image = req.file.filename
        }
        await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true })
        res.status(200).json({ message: "Product edit successfully" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server error editing product" })
    }
}

module.exports = { postProduct, getProduct, getProductById, deleteProduct, editProduct }