const Category = require('../models/categoryModels')

const addCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        console.log(category)
        res.status(201).json({ category, message: 'Category added successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to add category' })
    }
}


const getCategory = async (req, res) => {
    try {

        const category = await Category.find()
        res.status(200).json(category)

    } catch (error) {
        res.status(500).json(
            {
                message: 'server error'
            }
        )
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category_delete_id = req.params.id
        await Category.findByIdAndDelete(category_delete_id)
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to delete category' })
    }
}

const editCategory = async (req, res) => {
    try {
        const edited_category_id = req.params.id
        const edited_category_data = req.body
        console.log(edited_category_data)
        const category = await Category.findByIdAndUpdate(edited_category_id, edited_category_data, { new: true })
        res.status(200).json({ category, message: 'Category edited successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Failed to edit category' })
    }
}
module.exports = { addCategory, getCategory, deleteCategory, editCategory }