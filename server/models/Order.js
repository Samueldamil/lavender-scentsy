import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: String,
            image: String,
            category: String,
            price: Number,
            quantity: Number
        }
    ],
    shippingInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        note: String
    },

    subtotal: {
        type: Number,
        required: true
    },

    deliveryFee: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);