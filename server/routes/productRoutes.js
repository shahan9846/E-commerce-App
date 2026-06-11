const express = require('express');
const router = express.Router()
const upload = require('../middleware/upload')

const { postProduct, getProduct, getProductById, deleteProduct, editProduct } = require('../controllers/productControllers')

router.route('/').get(getProduct).post(upload.single('image'), postProduct)
router.route('/:id').get(getProductById).delete(deleteProduct).put(upload.single('image'),editProduct)

module.exports = router
