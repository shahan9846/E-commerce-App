const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        // 1. Link to the User who placed the order
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        // 2. The Items List (Array of objects)
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true }, // ⬅️ ADD THIS: Snapshot of price
                // 3. Order Tracking & Status
                deliveryStatus: {
                    type: String,
                    enum: ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
                    default: "Pending",
                },
            },
        ],
        // 4. Shipping & Payment
        shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
        paymentMethod: { type: String, required: true },
        paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },

        // razorpay
        razorpayOrderId: { type: String, default: null },
        razorpayPaymentId: { type: String, default: null },
        razorpaySignature: { type: String, default: null },

        // 5. Totals
        totalPrice: { type: Number, required: true }, // Grand Total
        // 6. Timestamps (automatically added by { timestamps: true })
        paidAt: { type: Date, default: null },
        deliveredAt: { type: Date },
        
        // Return Section
        isReturned: { type: Boolean, default: false },
        returnReason: {
            type: String,
            enum: [
                "Damaged Product",
                "Wrong Item Received",
                "Defective Product",
                "Item Not as Described",
                "Size/Color Mismatch",
                "Other"
            ],
        },
        returnStatus: {
            type: String,
            enum: ["Requested", "Approved", "Rejected", "Completed"],
            default: "Requested",
        },
        returnedAt: { type: Date },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema)





