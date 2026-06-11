const User = require('../models/authModels')

const wishlistAdd = async (req, res) => {
    try {


        const user = await User.findById(req.userId)

        const { productId } = req.body

        const product_index_in_wishlist = user.wishlist.findIndex(product => product.toString() === productId)

        console.log(product_index_in_wishlist)

        let message;

        if (product_index_in_wishlist === -1) {
            user.wishlist.push(productId)
            message = "Added to wishlist"
        }
        else {
            user.wishlist = user.wishlist.filter(item => item.toString() !== productId)
            message = "Removed from wishlist"
        }

        await user.save()

        await user.populate('wishlist')

        res.status(200).json({
            wishlist: user.wishlist,
            message
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'cannot add product to wishlist' });
    }
}


const wishlistfetch = async (req, res) => {

    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        await user.populate('wishlist')

        // Filter out items where the product was deleted
        const originalLength = user.wishlist.length
        const validWishlist = user.wishlist.filter(item => item !== null)
        
        if (validWishlist.length !== originalLength) {
            user.wishlist = validWishlist
            await user.save()
        }

        res.status(200).json({ wishlist: user.wishlist })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error fetching wishlist' })
    }
}


const wishlistdelete = async (req, res) => {

    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const productId = req.params.id

        user.wishlist = user.wishlist.filter(item => item && item.toString() !== productId)

        await user.save()

        await user.populate('wishlist')

        res.status(200).json({
            wishlist: user.wishlist,
            message: 'item delete'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error deleting from wishlist' })
    }
}
module.exports = { wishlistAdd, wishlistfetch, wishlistdelete }
