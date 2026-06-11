const User = require('../models/authModels')

const addCart = async (req, res) => {


    try {

        const user = await User.findById(req.userId);

        const { productId } = req.body

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => {
            return item.product.toString() === productId;
        });

        // check the product is already in the cart using index.if itemIndex return 0,1,2,etc... the product is there.increase the quantity
        // if itemIndex return -1 the product is not there, then push the product and add quantity 1

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += 1;
        } else {
            user.cart.push({
                product: productId,
                quantity: 1
            });
        }

        await user.save();

        const populated_user = await User.findById(req.userId).populate("cart.product");

        console.log(populated_user)

        // populate = get full data from referenced collection 
        // Without populate → only product ID
        // With populate → full product info

        res.status(200).json({
            message: "Product added to cart",
            cart: populated_user.cart,

        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({ message: 'Server error' });
    }
};


const fetchCart = async (req, res) => {

    try {
        const user = await User.findById(req.userId).populate('cart.product')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Filter out items where the product was deleted
        const originalLength = user.cart.length
        const validCart = user.cart.filter(item => item && item.product !== null)
        
        if (validCart.length !== originalLength) {
            user.cart = validCart
            await user.save()
        }

        const totalQuantity = user.cart.reduce((sum, item) => sum + item.quantity, 0)

        const totalPrice = user.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

        res.status(200).json({
            cart: user.cart,
            totalQuantity,
            totalPrice
        })
    } catch (error) {

        console.log(error.message);

        res.status(500).json({ message: 'cannot get cart item' });
    }
}

const deleteCart = async (req, res) => {

    try {
        const productId = req.params.id

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.cart = user.cart.filter(item => item.product && item.product.toString() !== productId)

        await user.save()

        const populated_user = await User.findById(req.userId).populate("cart.product")

        res.status(200).json({
            cart: populated_user.cart,
            message: 'Item deleted successfully'
        })

    } catch (error) {

        console.log(error.message)

        res.status(500).json({ message: 'Server error' })

    }
}

const qtyInc = async (req, res) => {

    try {

        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const productId = req.params.id

        const item = user.cart.find(item => item.product && item.product.toString() === productId)

        if (item) {
            item.quantity += 1
        } else {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        await user.save()

        const populated_user = await User.findById(req.userId).populate('cart.product')

        res.json({ cart: populated_user.cart })

    } catch (error) {

        res.status(500).json({ message: 'Server error' })

    }
}

const qtyDec = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const productId = req.params.id
        const cart_QtyDecItem = user.cart.find(item => item.product && item.product.toString() === productId)
        if (!cart_QtyDecItem) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }
        if (cart_QtyDecItem.quantity > 1) {
            cart_QtyDecItem.quantity -= 1
        }
        await user.save()
        const populated_user = await User.findById(req.userId).populate('cart.product')
        res.json({ cart: populated_user.cart })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

const clearCart = async (req, res) => {
    try {

        const userId = req.userId
        console.log(userId)
        const user = await User.findById(userId)
        user.cart = []
        await user.save()
        res.status(200).json({message: 'cart successfully emptied', cart: []  })
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { addCart, fetchCart, deleteCart, qtyInc, qtyDec, clearCart }