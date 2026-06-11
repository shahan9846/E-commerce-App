import { axiosPrivate } from '../../axios';

export const fetchUserProfile = async () => {
    const response = await axiosPrivate.get('/auth/profile');
    return response.data;
};

export const updateUserProfile = async (user) => {
    const response = await axiosPrivate.put('/auth/profile', user);
    return response.data;
};
