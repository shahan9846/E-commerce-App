import React, { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'
import { addToCart, deleteToCart, increaseQty, decreaseQty, clearCart } from '../services/user-api-service/cartApi'

import { Toaster, toast } from 'sonner'
export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const onQtyInc = async (productId) => {
        try {
            const data = await increaseQty(productId);
            setCart(data.cart);
        } catch (error) {
            console.log(error);
        }
    };

    const onQtyDec = async (productId) => {
        try {
            const data = await decreaseQty(productId);
            setCart(data.cart);
        } catch (error) {
            console.log(error);
        }
    };

    const onCartDelete = async (productId) => {
        try {
            const data = await deleteToCart(productId)
            setCart(data.cart)
            toast.error(`Deleted Item from Cart`)
        } catch (error) {
            console.log(error.message)
        }
    }

    const onCartAdd = async (productId) => {
        // console.log(productId)
        try {
            const data = await addToCart(productId);
            console.log(data.cart);
            setCart(data.cart);
            toast.success("Added Item to Cart");
        } catch (error) {
            console.log(error.message);
        }
    };

    const onCartClear = async () => {
        try {
            await clearCart()
            setCart([])
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <CartContext.Provider value={{ cart, setCart, onCartAdd, onCartDelete, onQtyDec, onQtyInc, onCartClear }}>{children}</CartContext.Provider>
    )
}