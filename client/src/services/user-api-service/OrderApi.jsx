import { axiosPrivate } from '../../axios';

export const createOrder = async (orderData) => {
    const response = await axiosPrivate.post('/order', orderData);
    return response.data;
};

export const verifyPayment = async (verificationData) => {
    const response = await axiosPrivate.post('/order/payment/verify-payment', verificationData);
    return response.data;
};

export const fetchUserOrders = async () => {
    const response = await axiosPrivate.get('/order');
    return response.data;
};

export const returnOrderRequest = async (orderId, selectedReason) => {
    const response = await axiosPrivate.put(`/order/return/${orderId}`, { data: selectedReason });
    return response.data;
};

export const cancelOrderItem = async (orderId, productId) => {
    const response = await axiosPrivate.delete(`/order/${orderId}`, {
        data: { productId }
    });
    return response.data;
};
