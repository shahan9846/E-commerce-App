import { axiosPrivate } from '../../axios';

export const fetchCategory = async () => {
    try {
        const response = await axiosPrivate.get('/category');
        return response.data;
    } catch (error) {
        console.log("Cannot fetch products", error);
        return [];
    }
};

export const addCategory = async (data) => {
    try {
        const response = await axiosPrivate.post('/category', data);
        return response.data;
    } catch (error) {
        console.log("Error adding category", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axiosPrivate.delete(`/category/${id}`)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}


export const categoryEditId = async (id, data) => {
    try {
        const response = await axiosPrivate.put(`/category/${id}`, data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}