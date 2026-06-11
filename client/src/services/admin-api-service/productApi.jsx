import { axiosPrivate } from '../../axios';

export const fetchProducts = async () => {
    try {
        const response = await axiosPrivate.get('/product');
        return response.data;
    } catch (error) {
        console.log("Cannot fetch products", error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await axiosPrivate.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.log("Cannot fetch products", error);
    }
};

export const productDelete = async (id) => {
    try {
        const response = await axiosPrivate.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error deleting product", error);
    }
};

export const createProduct = async (data) => {
    const response = await axiosPrivate.post('/product', data);
    return response;
};

export const updateProduct = async (id, data) => {
    const response = await axiosPrivate.put(`/product/${id}`, data);
    return response;
};
