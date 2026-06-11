import { axiosPrivate } from '../../axios';

export const addToWishlist = async (productId) => {
    const response = await axiosPrivate.post('/wishlist', { productId });
    return response.data;
}

export const deleteToWishlist = async (productId) => {
    const response = await axiosPrivate.delete(`/wishlist/${productId}`);
    return response.data;
}

export const fetchWishlist = async () => {
    const response = await axiosPrivate.get('/wishlist');
    return response.data;
}