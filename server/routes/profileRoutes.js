const express = require('express');
const { getProfile, updateProfile, getAllCustomers, getAdminStats } = require('../controllers/profileControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

router.use(authMiddleware)

router.route('/').get(getProfile).put(updateProfile)
router.route('/customers').get(getAllCustomers)
router.route('/stats').get(getAdminStats)

module.exports = router


