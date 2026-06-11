import { axiosPrivate } from '../../axios';

export const fetchCart = async () => {
    const response = await axiosPrivate.get('/cart');
    return response.data;
};

export const addToCart = async (productId) => {
    const response = await axiosPrivate.post('/cart', { productId })
    console.log(response.data)
    return response.data
}

export const deleteToCart = async (productId) => {
    const response = await axiosPrivate.delete(`/cart/${productId}`)
    return response.data
}

export const increaseQty = async (productId) => {
    const response = await axiosPrivate.put(`/cart/${productId}/increase`, {});
    return response.data;
};

export const decreaseQty = async (productId) => {
    const response = await axiosPrivate.put(`/cart/${productId}/decrease`, {});
    return response.data;
};

export const clearCart = async () => {
    const response = await axiosPrivate.delete('/cart')
    return response.data
}