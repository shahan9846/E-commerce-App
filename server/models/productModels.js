const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }

    }
)

module.exports = mongoose.model('Product', productSchema)