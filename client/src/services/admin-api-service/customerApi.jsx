import { axiosPrivate } from '../../axios';

export const getCustomerDetails = async () => {
    try {
        const response = await axiosPrivate.get('/auth/profile/customers');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAdminStats = async () => {
    try {
        const response = await axiosPrivate.get('/auth/profile/stats');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}