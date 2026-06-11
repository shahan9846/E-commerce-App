import React, { createContext, useState } from 'react'
// import { toast } from 'react-toastify';
import { Toaster, toast } from 'sonner'

import { addToWishlist, deleteToWishlist } from '../services/user-api-service/wishlistApi'

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState([])

    const wishlistDelete = async (productId) => {
        try {
            await deleteToWishlist(productId)
            setWishlist(current_wishlist => {
                toast.error('Remove Item from Wishlist')
                return current_wishlist.filter((item) => item._id !== productId)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const wishlistAdd = async (productId) => {
        try {
            // console.log(productId)
            const data = await addToWishlist(productId)
            setWishlist(data.wishlist)
            if (data.message === 'Added to wishlist') {
                toast.success('Added item to Wishlist')
            } else {
                toast.error('Remove item from Wishlist')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <WishlistContext.Provider value={{ wishlist, setWishlist, wishlistAdd, wishlistDelete }}>{children}</WishlistContext.Provider>
    )
}