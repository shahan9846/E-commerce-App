import { axiosPrivate } from '../../axios';

export const fetchAddress = async () => {
    const response = await axiosPrivate.get('/address')
    return response.data
}

export const addAddress = async (formData) => {
    const response = await axiosPrivate.post('/address', formData)
    return response.data
}

export const editAddress = async (editId, formData) => {
    const response = await axiosPrivate.put(`/address/${editId}`, formData)
    return response.data
}

export const deleteAddress = async (id) => {
    const response = await axiosPrivate.delete(`/address/${id}`);
    return response.data
}

export const setPrimary = async (id) => {
    const response = await axiosPrivate.put(`/address/${id}/set-primary`, {});
    return response.data
}