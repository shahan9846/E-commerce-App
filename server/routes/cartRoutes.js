const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
router.use(authMiddleware)

const { addCart, fetchCart, deleteCart, qtyInc, qtyDec,clearCart } = require('../controllers/cartControllers')

router.route('/').post(addCart).get(fetchCart).delete(clearCart)
router.delete('/:id', deleteCart)
router.put('/:id/increase', qtyInc)
router.put('/:id/decrease', qtyDec)

module.exports = router