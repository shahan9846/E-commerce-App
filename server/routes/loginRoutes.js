const express = require('express')
const { login } = require('../controllers/authControllers')

const router = express.Router()

router.post('/', login)

module.exports = router