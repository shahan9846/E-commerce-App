import { axiosPrivate } from '../../axios';

export const getOrderDetails = async () => {
    try {
        const response = await axiosPrivate.get('/order');
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const addDeliveryStatus = async (itemId, productId, status) => {
    try {
        const response = await axiosPrivate.put(`/order/${itemId}`, { productId, status });
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}
