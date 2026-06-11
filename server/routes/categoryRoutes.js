const express = require('express')

const router = express.Router()

const { addCategory, getCategory, deleteCategory,editCategory } = require('../controllers/categoryControllers')

router.route('/').post(addCategory).get(getCategory);
router.route('/:id').delete(deleteCategory).put(editCategory)

module.exports = router