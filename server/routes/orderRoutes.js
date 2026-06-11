const express = require('express')

const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const { getOrder, createOrder, cancelOrder, editStatus, verifyPayment, returnStatus } = require('../controllers/orderController')

router.use(authMiddleware)

router.route('/').get(getOrder).post(createOrder)
router.route('/:id').delete(cancelOrder).put(editStatus)
router.route('/return/:id').put(returnStatus)
router.post('/payment/verify-payment', verifyPayment)

module.exports = router