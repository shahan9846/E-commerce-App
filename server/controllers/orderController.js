const Order = require('../models/orderModel')
const razorpay = require("../utils/razorpay.js");
const crypto = require("crypto");

const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId })
            .populate("user")
            .populate("orderItems.product")
            .populate("shippingAddress")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

const createOrder = async (req, res) => {

    let razorpayOrder = null

    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice, currency = 'INR' } = req.body;

        const order = await Order.create({
            user: req.userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        // If online payment, generate a Razorpay order

        if (paymentMethod !== "COD") {
            const options = {
                amount: totalPrice * 100, // in paise
                currency,
                receipt: `receipt_${order._id}`,
            };


            razorpayOrder = await razorpay.orders.create(options);


            if (!razorpayOrder) {
                return res.status(500).json({ message: "Razorpay order creation failed" });
            }

            //  Save Razorpay Order ID to database order instance
            order.razorpayOrderId = razorpayOrder.id;
            await order.save();

        }
        res.status(201).json({ order, razorpayOrder, paymentMethod, success: true });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Order creation failed" });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const { productId } = req.body;
        const order = await Order.findById(req.params.id);
        console.log(order)
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        // order.orderItems[0].deliveryStatus = 'Cancelled'
        // console.log(order.orderItems[0].deliveryStatus)
        // await order.orderItems.save()
        const findProduct = order.orderItems.find(ordr => ordr._id.toString() === productId)
        console.log(findProduct)
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found in this order" });
        }
        const updatedStatus = findProduct.deliveryStatus = 'Cancelled'

        await order.save()
        res.status(200).json({ message: 'order become cancelled', updatedStatus })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while cancelling order" });
    }
};


const editStatus = async (req, res) => {
    try {
        const itemId = req.params.id
        const { productId, status } = req.body
        const item = await Order.findById(itemId)
        const productStatus = item.orderItems.id(productId)
        productStatus.deliveryStatus = status
        await item.save()
        res.json({ item, message: 'Delivery status updated' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Order status not edited" });
    }

}

const returnStatus = async (req, res) => {
    console.log(req.params.id)
    console.log(req.body)

    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.isReturned = true
        const status = order.returnStatus
        order.returnReason = req.body.data;
        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            message: "Order return status updated successfully",
            order: updatedOrder,
            status
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error updating return status" });
    }
}


const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (!order) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            order.paymentStatus = "Paid";
            order.paidAt = new Date();
            order.razorpayPaymentId = razorpay_payment_id;
            order.razorpaySignature = razorpay_signature;

            order.orderItems.forEach(item => {
                item.deliveryStatus = "Processing";
            });

            await order.save();

            res.json({ success: true, message: "Payment verified successfully" });
        } else {
            const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
            if (order) {
                order.paymentStatus = "Failed";
                await order.save();
            }
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment Verification Error: ", error);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};

module.exports = { getOrder, createOrder, cancelOrder, editStatus, verifyPayment, returnStatus }