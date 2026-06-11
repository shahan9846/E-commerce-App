const express = require('express')
const router = express.Router()
const { createAddress, fetchAddress, editAddress, setPrimaryAddress, deleteAddress } = require('../controllers/addressControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware);

router.route('/').post(createAddress).get(fetchAddress);
router.route('/:id').put(editAddress).delete(deleteAddress);
router.put('/:id/set-primary', setPrimaryAddress);

module.exports = router