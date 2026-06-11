import axios, { axiosPrivate } from '../../axios';

export const loginUser = async (formData) => {
    const response = await axios.post('/login', formData);
    return response;
};

export const registerUser = async (formData) => {
    const response = await axios.post('/register', formData);
    return response;
};

export const fetchAuthHome = async () => {
    const response = await axiosPrivate.get('/auth/home');
    return response;
};
