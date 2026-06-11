const express = require('express')
const { wishlistAdd, wishlistfetch, wishlistdelete } = require('../controllers/wishlistControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.route('/').post(wishlistAdd).get(wishlistfetch)
router.delete('/:id', wishlistdelete)

module.exports = router